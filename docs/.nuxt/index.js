import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../node_modules/docus/dist/defaultTheme/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_8aa80f18 from 'nuxt_plugin_plugin_8aa80f18' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_pluginrouting_123bd208 from 'nuxt_plugin_pluginrouting_123bd208' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_5b0a95f3 from 'nuxt_plugin_pluginmain_5b0a95f3' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_docusi18n_31328bf9 from 'nuxt_plugin_docusi18n_31328bf9' // Source: ./docus-i18n.js (mode: 'all')
import nuxt_plugin_plugin_46094a5c from 'nuxt_plugin_plugin_46094a5c' // Source: ./composition-api/plugin.mjs (mode: 'all')
import nuxt_plugin_docus_6eeb1c2a from 'nuxt_plugin_docus_6eeb1c2a' // Source: ./docus.js (mode: 'all')
import nuxt_plugin_pluginserver_026a7472 from 'nuxt_plugin_pluginserver_026a7472' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_c69dfa2c from 'nuxt_plugin_pluginclient_c69dfa2c' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_socialimage_16184133 from 'nuxt_plugin_socialimage_16184133' // Source: ./social-image.js (mode: 'all')
import nuxt_plugin_image_084f2e85 from 'nuxt_plugin_image_084f2e85' // Source: ./image.js (mode: 'all')
import nuxt_plugin_workbox_6dd26c26 from 'nuxt_plugin_workbox_6dd26c26' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_1e282d39 from 'nuxt_plugin_metaplugin_1e282d39' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_22cfd2ad from 'nuxt_plugin_iconplugin_22cfd2ad' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_menu_c243fb42 from 'nuxt_plugin_menu_c243fb42' // Source: ../node_modules/docus/dist/defaultTheme/plugins/menu (mode: 'all')
import nuxt_plugin_plugin_29fbbd77 from 'nuxt_plugin_plugin_29fbbd77' // Source: ../node_modules/docus/dist/admin/runtime/plugin.js (mode: 'all')
import nuxt_plugin_meta_3f380c6e from 'nuxt_plugin_meta_3f380c6e' // Source: ./composition-api/meta.mjs (mode: 'all')
import nuxt_plugin_windicss_60f7094c from 'nuxt_plugin_windicss_60f7094c' // Source: ../node_modules/nuxt-windicss/dist/template/windicss.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Inter:wght@400;500;600;700;800&display=swap"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com"}],"style":[],"script":[{"hid":"nuxt-color-mode-script","innerHTML":"!function(){\"use strict\";var e=window,s=document,o=s.documentElement,a=[\"dark\",\"light\"],t=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\",c=\"system\"===t?l():t,i=s.body.getAttribute(\"data-color-mode-forced\");function r(e){var s=\"\"+e+\"\";o.classList?o.classList.add(s):o.className+=\" \"+s}function n(s){return e.matchMedia(\"(prefers-color-scheme\"+s+\")\")}function l(){if(e.matchMedia&&\"not all\"!==n(\"\").media)for(var s of a)if(n(\":\"+s).matches)return s;return\"light\"}i&&(c=i),r(c),e[\"__NUXT_COLOR_MODE__\"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=\"\"+e+\"\";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,\"g\"),\"\")}}}();\n","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"nuxt-color-mode-script":["innerHTML"]}},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_8aa80f18 === 'function') {
    await nuxt_plugin_plugin_8aa80f18(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_123bd208 === 'function') {
    await nuxt_plugin_pluginrouting_123bd208(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_5b0a95f3 === 'function') {
    await nuxt_plugin_pluginmain_5b0a95f3(app.context, inject)
  }

  if (typeof nuxt_plugin_docusi18n_31328bf9 === 'function') {
    await nuxt_plugin_docusi18n_31328bf9(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_46094a5c === 'function') {
    await nuxt_plugin_plugin_46094a5c(app.context, inject)
  }

  if (typeof nuxt_plugin_docus_6eeb1c2a === 'function') {
    await nuxt_plugin_docus_6eeb1c2a(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_026a7472 === 'function') {
    await nuxt_plugin_pluginserver_026a7472(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_c69dfa2c === 'function') {
    await nuxt_plugin_pluginclient_c69dfa2c(app.context, inject)
  }

  if (typeof nuxt_plugin_socialimage_16184133 === 'function') {
    await nuxt_plugin_socialimage_16184133(app.context, inject)
  }

  if (typeof nuxt_plugin_image_084f2e85 === 'function') {
    await nuxt_plugin_image_084f2e85(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_6dd26c26 === 'function') {
    await nuxt_plugin_workbox_6dd26c26(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_1e282d39 === 'function') {
    await nuxt_plugin_metaplugin_1e282d39(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_22cfd2ad === 'function') {
    await nuxt_plugin_iconplugin_22cfd2ad(app.context, inject)
  }

  if (typeof nuxt_plugin_menu_c243fb42 === 'function') {
    await nuxt_plugin_menu_c243fb42(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_29fbbd77 === 'function') {
    await nuxt_plugin_plugin_29fbbd77(app.context, inject)
  }

  if (typeof nuxt_plugin_meta_3f380c6e === 'function') {
    await nuxt_plugin_meta_3f380c6e(app.context, inject)
  }

  if (typeof nuxt_plugin_windicss_60f7094c === 'function') {
    await nuxt_plugin_windicss_60f7094c(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
