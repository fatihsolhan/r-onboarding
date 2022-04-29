export default function ({ app }, inject) {
  if (process.client) {
    app.i18n.onLanguageSwitched = () => {
      window.$nuxt.$docus.fetchNavigation()
    }
  }

  // Generate local path for static contents.
  // This helper does not respect `router.trailingSlash`
  // and add/remove trailingSlash baded on original path
  inject('contentLocalePath', path => {
    let localePath = app.localePath(path)
    if (path.endsWith('/') && !localePath.endsWith('/')) {
      localePath += '/'
    }
    if (!path.endsWith('/') && localePath.endsWith('/')) {
      localePath = localePath.replace(/\/*$/, '')
    }
    return localePath
  })
}
