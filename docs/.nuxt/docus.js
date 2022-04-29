import { joinURL, withLeadingSlash } from 'ufo'
import settings from '~docus-cache/docus-settings.json'
import { createDocus, RemoteQueryBuilder } from '~docus'
/*  */ import { useWebSocket } from '~docus/api/websocket' /*  */

/*  */
function createQuery(path, options) {
  path = withLeadingSlash(path)
  return new RemoteQueryBuilder(joinURL('/', '_docus', path), options)
}
/*  */

export default async function (ctx, inject) {
  /*  */

  const $docus = await createDocus(
    ctx,
    settings,
    process.server ? ctx.ssrContext.docus.createQuery : createQuery
  )

  inject('docus', $docus)

  /*  */
  useWebSocket({ base: '_docus' }).connect()
  /*  */
}
