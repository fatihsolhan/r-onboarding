import Cookie from 'cookie'
import JsCookie from 'js-cookie'

/** @typedef {import('../../types/internal').ResolvedOptions} ResolvedOptions */

/**
 * Formats a log message, prefixing module's name to it.
 *
 * @param {string} text
 * @return {string}
 */
export function formatMessage (text) {
  return `[nuxt-i18n] ${text}`
}

/**
 * Parses locales provided from browser through `accept-language` header.
 *
 * @param {string} input
 * @return {string[]} An array of locale codes. Priority determined by order in array.
 */
export function parseAcceptLanguage (input) {
  // Example input: en-US,en;q=0.9,nb;q=0.8,no;q=0.7
  // Contains tags separated by comma.
  // Each tag consists of locale code (2-3 letter language code) and optionally country code
  // after dash. Tag can also contain score after semicolon, that is assumed to match order
  // so it's not explicitly used.
  return input.split(',').map(tag => tag.split(';')[0])
}

/**
 * Find locale code that best matches provided list of browser locales.
 *
 * @param {ResolvedOptions['normalizedLocales']} appLocales The user-configured locales that are to be matched.
 * @param {readonly string[]} browserLocales The locales to match against configured.
 * @return {string | undefined}
 */
export function matchBrowserLocale (appLocales, browserLocales) {
  /** @type {{ code: string, score: number }[]} */
  const matchedLocales = []

  // Normalise appLocales input
  /** @type {{ code: string, iso: string }[]} */
  const normalizedAppLocales = []
  for (const appLocale of appLocales) {
    const { code } = appLocale
    const iso = appLocale.iso || code
    normalizedAppLocales.push({ code, iso })
  }

  // First pass: match exact locale.
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = normalizedAppLocales.find(appLocale => appLocale.iso.toLowerCase() === browserCode.toLowerCase())
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length })
      break
    }
  }

  // Second pass: match only locale code part of the browser locale (not including country).
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split('-')[0].toLowerCase()
    const matchedLocale = normalizedAppLocales.find(appLocale => appLocale.iso.split('-')[0].toLowerCase() === languageCode)
    if (matchedLocale) {
      // Deduct a thousandth for being non-exact match.
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length })
      break
    }
  }

  // Sort the list by score (0 - lowest, 1 - highest).
  if (matchedLocales.length > 1) {
    matchedLocales.sort((localeA, localeB) => {
      if (localeA.score === localeB.score) {
        // If scores are equal then pick more specific (longer) code.
        return localeB.code.length - localeA.code.length
      }

      return localeB.score - localeA.score
    })
  }

  return matchedLocales.length ? matchedLocales[0].code : undefined
}

/**
 * Resolves base URL value if provided as function. Otherwise just returns verbatim.
 *
 * @param {string | ((context: import('@nuxt/types').Context) => string)} baseUrl
 * @param {import('@nuxt/types').Context} context
 * @param {import('../../types').Locale} localeCode
 * @param {Pick<ResolvedOptions, 'differentDomains' | 'normalizedLocales'>} options
 * @return {string}
 */
export function resolveBaseUrl (baseUrl, context, localeCode, { differentDomains, normalizedLocales }) {
  if (typeof baseUrl === 'function') {
    return baseUrl(context)
  }

  if (differentDomains && localeCode) {
    // Lookup the `differentDomain` origin associated with given locale.
    const domain = getDomainFromLocale(localeCode, context.req, { normalizedLocales })
    if (domain) {
      return domain
    }
  }

  return baseUrl
}

/**
 * Gets the `differentDomain` domain from locale.
 *
 * @param {string} localeCode
 * @param {import('http').IncomingMessage | undefined} req
 * @param {Pick<ResolvedOptions, 'normalizedLocales'>} options
 * @return {string | undefined}
 */
export function getDomainFromLocale (localeCode, req, { normalizedLocales }) {
// Lookup the `differentDomain` origin associated with given locale.
  const lang = normalizedLocales.find(locale => locale.code === localeCode)
  if (lang && lang.domain) {
    let protocol
    if (process.server) {
      protocol = (req && isHTTPS(req)) ? 'https' : 'http'
    } else {
      protocol = window.location.protocol.split(':')[0]
    }
    return `${protocol}://${lang.domain}`
  }

  // eslint-disable-next-line no-console
  console.warn(formatMessage(`Could not find domain name for locale ${localeCode}`))
}

/**
 * Determines if a server-side request is using HTTPS.
 *
 * @param {import('http').IncomingMessage} req
 * @param {Boolean} [trustProxy=true]
 * @return {Boolean | undefined}.
 */
function isHTTPS (req, trustProxy = true) {
  // Check x-forwarded-proto header
  const _xForwardedProto = (trustProxy && req.headers) ? req.headers['x-forwarded-proto'] : undefined
  const protoCheck = typeof _xForwardedProto === 'string' ? _xForwardedProto.includes('https') : undefined
  if (protoCheck) {
    return true
  }

  const socket = /** @type {import('tls').TLSSocket} */(req.socket)
  const _encrypted = socket ? socket.encrypted : undefined
  const encryptedCheck = _encrypted !== undefined ? _encrypted === true : undefined
  if (encryptedCheck) {
    return true
  }

  if (protoCheck === undefined && encryptedCheck === undefined) {
    return undefined
  }

  return false
}

/**
 * Get locale code that corresponds to current hostname
 *
 * @param  {ResolvedOptions['normalizedLocales']} locales
 * @param  {import('http').IncomingMessage | undefined} req
 * @return {string} Locale code found if any
 */
export function getLocaleDomain (locales, req) {
  /** @type {string | undefined} */
  let host

  if (process.client) {
    host = window.location.host
  } else if (req) {
    const detectedHost = req.headers['x-forwarded-host'] || req.headers.host
    host = Array.isArray(detectedHost) ? detectedHost[0] : detectedHost
  }

  if (host) {
    const matchingLocale = locales.find(l => l.domain === host)
    if (matchingLocale) {
      return matchingLocale.code
    }
  }

  return ''
}

/**
 * Creates a RegExp for route paths
 *
 * @param  {readonly string[]} localeCodes
 * @return {RegExp}
 */
export function getLocalesRegex (localeCodes) {
  return new RegExp(`^/(${localeCodes.join('|')})(?:/|$)`, 'i')
}

/**
 * Creates getter for getLocaleFromRoute
 *
 * @param  {readonly string[]} localeCodes
 * @param  {Pick<ResolvedOptions, 'routesNameSeparator' | 'defaultLocaleRouteNameSuffix'>} options
 */
export function createLocaleFromRouteGetter (localeCodes, { routesNameSeparator, defaultLocaleRouteNameSuffix }) {
  const localesPattern = `(${localeCodes.join('|')})`
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')
  const regexpPath = getLocalesRegex(localeCodes)
  /**
   * Extract locale code from given route:
   * - If route has a name, try to extract locale from it
   * - Otherwise, fall back to using the routes'path
   * @param  {import('vue-router').Route} route
   * @return {string} Locale code found if any
   */
  const getLocaleFromRoute = route => {
    // Extract from route name
    if (route.name) {
      const matches = route.name.match(regexpName)
      if (matches && matches.length > 1) {
        return matches[1]
      }
    } else if (route.path) {
      // Extract from path
      const matches = route.path.match(regexpPath)
      if (matches && matches.length > 1) {
        return matches[1]
      }
    }

    return ''
  }

  return getLocaleFromRoute
}

/**
 * @param {import('http').IncomingMessage | undefined} req
 * @param {{ useCookie: boolean, cookieKey: string, localeCodes: readonly string[] }} options
 * @return {string | undefined}
 */
export function getLocaleCookie (req, { useCookie, cookieKey, localeCodes }) {
  if (useCookie) {
    let localeCode

    if (process.client) {
      localeCode = JsCookie.get(cookieKey)
    } else if (req && typeof req.headers.cookie !== 'undefined') {
      const cookies = req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
      localeCode = cookies[cookieKey]
    }

    if (localeCode && localeCodes.includes(localeCode)) {
      return localeCode
    }
  }
}

/**
 * @param {string} locale
 * @param {import('http').ServerResponse | undefined} res
 * @param {{ useCookie: boolean, cookieDomain: string | null, cookieKey: string, cookieSecure: boolean, cookieCrossOrigin: boolean}} options
 */
export function setLocaleCookie (locale, res, { useCookie, cookieDomain, cookieKey, cookieSecure, cookieCrossOrigin }) {
  if (!useCookie) {
    return
  }
  const date = new Date()
  /** @type {import('cookie').CookieSerializeOptions} */
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: '/',
    sameSite: cookieCrossOrigin ? 'none' : 'lax',
    secure: cookieCrossOrigin || cookieSecure
  }

  if (cookieDomain) {
    cookieOptions.domain = cookieDomain
  }

  if (process.client) {
    // @ts-ignore
    JsCookie.set(cookieKey, locale, cookieOptions)
  } else if (res) {
    let headers = res.getHeader('Set-Cookie') || []
    if (!Array.isArray(headers)) {
      headers = [String(headers)]
    }

    const redirectCookie = Cookie.serialize(cookieKey, locale, cookieOptions)
    headers.push(redirectCookie)

    res.setHeader('Set-Cookie', headers)
  }
}

/**
 * @param {import('vuex').Store<Record<string, boolean>>} store
 * @param {Required<import('../../types').VuexOptions>} vuex
 * @param {readonly string[]} localeCodes
 */
export function registerStore (store, vuex, localeCodes) {
  /** @typedef {{
   *    locale?: string
   *    messages?: Record<string, string>
   *    routeParams?: Record<string, Record<string, string>>
   * }} ModuleStore
   *
   * @type {import('vuex').Module<ModuleStore, {}>}
   */
  const storeModule = {
    namespaced: true,
    state: () => ({
      ...(vuex.syncLocale ? { locale: '' } : {}),
      ...(vuex.syncMessages ? { messages: {} } : {}),
      ...(vuex.syncRouteParams ? { routeParams: {} } : {})
    }),
    actions: {
      ...(vuex.syncLocale
        ? {
            setLocale ({ commit }, locale) {
              commit('setLocale', locale)
            }
          }
        : {}),
      ...(vuex.syncMessages
        ? {
            setMessages ({ commit }, messages) {
              commit('setMessages', messages)
            }
          }
        : {}),
      ...(vuex.syncRouteParams
        ? {
            setRouteParams ({ commit }, params) {
              if (process.env.NODE_ENV === 'development') {
                validateRouteParams(params, localeCodes)
              }
              commit('setRouteParams', params)
            }
          }
        : {})
    },
    mutations: {
      ...(vuex.syncLocale
        ? {
            setLocale (state, locale) {
              state.locale = locale
            }
          }
        : {}),
      ...(vuex.syncMessages
        ? {
            setMessages (state, messages) {
              state.messages = messages
            }
          }
        : {}),
      ...(vuex.syncRouteParams
        ? {
            setRouteParams (state, params) {
              state.routeParams = params
            }
          }
        : {})
    },
    getters: {
      ...(vuex.syncRouteParams
        ? {
            localeRouteParams: ({ routeParams }) => {
              /** @type {(locale: string) => Record<string, string>} */
              const paramsGetter = locale => (routeParams && routeParams[locale]) || {}
              return paramsGetter
            }
          }
        : {})
    }
  }
  store.registerModule(vuex.moduleName, storeModule, { preserveState: !!store.state[vuex.moduleName] })
}

/**
 * Dispatch store module actions to keep it in sync with app's locale data
 *
 * @param  {import('vuex').Store<void>} store
 * @param  {string | null} locale The current locale
 * @param  {object | null} messages Current messages
 * @param  {ResolvedOptions['vuex']} vuex
 * @return {Promise<void>}
 */
export async function syncVuex (store, locale = null, messages = null, vuex) {
  if (vuex && store) {
    if (locale !== null && vuex.syncLocale) {
      await store.dispatch(vuex.moduleName + '/setLocale', locale)
    }
    if (messages !== null && vuex.syncMessages) {
      await store.dispatch(vuex.moduleName + '/setMessages', messages)
    }
  }
}

/**
 * @param {any} value
 * @return {boolean}
 */
const isObject = value => value && !Array.isArray(value) && typeof value === 'object'

/**
 * Validate setRouteParams action's payload
 *
 * @param {object} routeParams The action's payload
 * @param {readonly string[]} localeCodes
 */
export function validateRouteParams (routeParams, localeCodes) {
  if (!isObject(routeParams)) {
    // eslint-disable-next-line no-console
    console.warn(formatMessage('Route params should be an object'))
    return
  }

  for (const [key, value] of Object.entries(routeParams)) {
    if (!localeCodes.includes(key)) {
    // eslint-disable-next-line no-console
      console.warn(formatMessage(`Trying to set route params for key ${key} which is not a valid locale`))
    } else if (!isObject(value)) {
    // eslint-disable-next-line no-console
      console.warn(formatMessage(`Trying to set route params for locale ${key} with a non-object value`))
    }
  }
}
