import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  BuiltWithNuxtDark: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/BuiltWithNuxtDark.vue' /* webpackChunkName: "components/built-with-nuxt-dark" */).then(c => wrapFunctional(c.default || c)),
  BuiltWithNuxtLight: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/BuiltWithNuxtLight.vue' /* webpackChunkName: "components/built-with-nuxt-light" */).then(c => wrapFunctional(c.default || c)),
  IconArrowLeft: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconArrowLeft.vue' /* webpackChunkName: "components/icon-arrow-left" */).then(c => wrapFunctional(c.default || c)),
  IconArrowRight: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconArrowRight.vue' /* webpackChunkName: "components/icon-arrow-right" */).then(c => wrapFunctional(c.default || c)),
  IconBadgeCheck: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconBadgeCheck.vue' /* webpackChunkName: "components/icon-badge-check" */).then(c => wrapFunctional(c.default || c)),
  IconCheckCircle: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconCheckCircle.vue' /* webpackChunkName: "components/icon-check-circle" */).then(c => wrapFunctional(c.default || c)),
  IconChevronRight: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconChevronRight.vue' /* webpackChunkName: "components/icon-chevron-right" */).then(c => wrapFunctional(c.default || c)),
  IconClipboardCheck: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconClipboardCheck.vue' /* webpackChunkName: "components/icon-clipboard-check" */).then(c => wrapFunctional(c.default || c)),
  IconClipboardCopy: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconClipboardCopy.vue' /* webpackChunkName: "components/icon-clipboard-copy" */).then(c => wrapFunctional(c.default || c)),
  IconEdit: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconEdit.vue' /* webpackChunkName: "components/icon-edit" */).then(c => wrapFunctional(c.default || c)),
  IconExclamationCircle: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconExclamationCircle.vue' /* webpackChunkName: "components/icon-exclamation-circle" */).then(c => wrapFunctional(c.default || c)),
  IconExternalLink: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconExternalLink.vue' /* webpackChunkName: "components/icon-external-link" */).then(c => wrapFunctional(c.default || c)),
  IconGitHub: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconGitHub.vue' /* webpackChunkName: "components/icon-git-hub" */).then(c => wrapFunctional(c.default || c)),
  IconHeart: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconHeart.vue' /* webpackChunkName: "components/icon-heart" */).then(c => wrapFunctional(c.default || c)),
  IconInformationCircle: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconInformationCircle.vue' /* webpackChunkName: "components/icon-information-circle" */).then(c => wrapFunctional(c.default || c)),
  IconMenu: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconMenu.vue' /* webpackChunkName: "components/icon-menu" */).then(c => wrapFunctional(c.default || c)),
  IconMenuAlt: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconMenuAlt.vue' /* webpackChunkName: "components/icon-menu-alt" */).then(c => wrapFunctional(c.default || c)),
  IconMoon: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconMoon.vue' /* webpackChunkName: "components/icon-moon" */).then(c => wrapFunctional(c.default || c)),
  IconNuxt: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconNuxt.vue' /* webpackChunkName: "components/icon-nuxt" */).then(c => wrapFunctional(c.default || c)),
  IconNuxtContent: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconNuxtContent.vue' /* webpackChunkName: "components/icon-nuxt-content" */).then(c => wrapFunctional(c.default || c)),
  IconNuxtLabs: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconNuxtLabs.vue' /* webpackChunkName: "components/icon-nuxt-labs" */).then(c => wrapFunctional(c.default || c)),
  IconSearch: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconSearch.vue' /* webpackChunkName: "components/icon-search" */).then(c => wrapFunctional(c.default || c)),
  IconSun: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconSun.vue' /* webpackChunkName: "components/icon-sun" */).then(c => wrapFunctional(c.default || c)),
  IconTranslate: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconTranslate.vue' /* webpackChunkName: "components/icon-translate" */).then(c => wrapFunctional(c.default || c)),
  IconTwitter: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconTwitter.vue' /* webpackChunkName: "components/icon-twitter" */).then(c => wrapFunctional(c.default || c)),
  IconVite: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconVite.vue' /* webpackChunkName: "components/icon-vite" */).then(c => wrapFunctional(c.default || c)),
  IconVue: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconVue.vue' /* webpackChunkName: "components/icon-vue" */).then(c => wrapFunctional(c.default || c)),
  IconWindi: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconWindi.vue' /* webpackChunkName: "components/icon-windi" */).then(c => wrapFunctional(c.default || c)),
  IconX: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconX.vue' /* webpackChunkName: "components/icon-x" */).then(c => wrapFunctional(c.default || c)),
  IconXCircle: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/icons/IconXCircle.vue' /* webpackChunkName: "components/icon-x-circle" */).then(c => wrapFunctional(c.default || c)),
  AsideBottom: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/AsideBottom.vue' /* webpackChunkName: "components/aside-bottom" */).then(c => wrapFunctional(c.default || c)),
  AsideTop: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/AsideTop.vue' /* webpackChunkName: "components/aside-top" */).then(c => wrapFunctional(c.default || c)),
  FooterBody: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/FooterBody.vue' /* webpackChunkName: "components/footer-body" */).then(c => wrapFunctional(c.default || c)),
  HeaderNavigation: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/HeaderNavigation.vue' /* webpackChunkName: "components/header-navigation" */).then(c => wrapFunctional(c.default || c)),
  PageTocBottom: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/PageTocBottom.vue' /* webpackChunkName: "components/page-toc-bottom" */).then(c => wrapFunctional(c.default || c)),
  PageTocTop: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/slots/PageTocTop.vue' /* webpackChunkName: "components/page-toc-top" */).then(c => wrapFunctional(c.default || c)),
  Alert: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Alert.vue' /* webpackChunkName: "components/alert" */).then(c => wrapFunctional(c.default || c)),
  Badge: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Badge.vue' /* webpackChunkName: "components/badge" */).then(c => wrapFunctional(c.default || c)),
  ButtonLink: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ButtonLink.vue' /* webpackChunkName: "components/button-link" */).then(c => wrapFunctional(c.default || c)),
  Card: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Card.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c)),
  CardGrid: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/CardGrid.vue' /* webpackChunkName: "components/card-grid" */).then(c => wrapFunctional(c.default || c)),
  CodeBlock: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/CodeBlock.vue' /* webpackChunkName: "components/code-block" */).then(c => wrapFunctional(c.default || c)),
  CodeGroup: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/CodeGroup.vue' /* webpackChunkName: "components/code-group" */).then(c => wrapFunctional(c.default || c)),
  CodeSandbox: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/CodeSandbox.vue' /* webpackChunkName: "components/code-sandbox" */).then(c => wrapFunctional(c.default || c)),
  ColorSwitcher: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ColorSwitcher.vue' /* webpackChunkName: "components/color-switcher" */).then(c => wrapFunctional(c.default || c)),
  CopyButton: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/CopyButton.vue' /* webpackChunkName: "components/copy-button" */).then(c => wrapFunctional(c.default || c)),
  Dropdown: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Dropdown.vue' /* webpackChunkName: "components/dropdown" */).then(c => wrapFunctional(c.default || c)),
  HeaderLogo: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/HeaderLogo.vue' /* webpackChunkName: "components/header-logo" */).then(c => wrapFunctional(c.default || c)),
  InjectComponent: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/InjectComponent.vue' /* webpackChunkName: "components/inject-component" */).then(c => wrapFunctional(c.default || c)),
  InjectContent: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/InjectContent.vue' /* webpackChunkName: "components/inject-content" */).then(c => wrapFunctional(c.default || c)),
  LangSwitcher: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/LangSwitcher.vue' /* webpackChunkName: "components/lang-switcher" */).then(c => wrapFunctional(c.default || c)),
  List: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/List.vue' /* webpackChunkName: "components/list" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Props: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/Props.vue' /* webpackChunkName: "components/props" */).then(c => wrapFunctional(c.default || c)),
  ProseA: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseA.vue' /* webpackChunkName: "components/prose-a" */).then(c => wrapFunctional(c.default || c)),
  ProseBlockquote: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseBlockquote.vue' /* webpackChunkName: "components/prose-blockquote" */).then(c => wrapFunctional(c.default || c)),
  ProseCode: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseCode.vue' /* webpackChunkName: "components/prose-code" */).then(c => wrapFunctional(c.default || c)),
  ProseCodeInline: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseCodeInline.vue' /* webpackChunkName: "components/prose-code-inline" */).then(c => wrapFunctional(c.default || c)),
  ProseH1: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseH1.vue' /* webpackChunkName: "components/prose-h1" */).then(c => wrapFunctional(c.default || c)),
  ProseH2: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseH2.vue' /* webpackChunkName: "components/prose-h2" */).then(c => wrapFunctional(c.default || c)),
  ProseH3: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseH3.vue' /* webpackChunkName: "components/prose-h3" */).then(c => wrapFunctional(c.default || c)),
  ProseHr: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseHr.vue' /* webpackChunkName: "components/prose-hr" */).then(c => wrapFunctional(c.default || c)),
  ProseImg: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseImg.vue' /* webpackChunkName: "components/prose-img" */).then(c => wrapFunctional(c.default || c)),
  ProseLi: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseLi.vue' /* webpackChunkName: "components/prose-li" */).then(c => wrapFunctional(c.default || c)),
  ProseOl: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseOl.vue' /* webpackChunkName: "components/prose-ol" */).then(c => wrapFunctional(c.default || c)),
  ProseParagraph: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseParagraph.vue' /* webpackChunkName: "components/prose-paragraph" */).then(c => wrapFunctional(c.default || c)),
  ProseStrong: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseStrong.vue' /* webpackChunkName: "components/prose-strong" */).then(c => wrapFunctional(c.default || c)),
  ProseTable: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseTable.vue' /* webpackChunkName: "components/prose-table" */).then(c => wrapFunctional(c.default || c)),
  ProseTbody: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseTbody.vue' /* webpackChunkName: "components/prose-tbody" */).then(c => wrapFunctional(c.default || c)),
  ProseTd: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseTd.vue' /* webpackChunkName: "components/prose-td" */).then(c => wrapFunctional(c.default || c)),
  ProseTh: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseTh.vue' /* webpackChunkName: "components/prose-th" */).then(c => wrapFunctional(c.default || c)),
  ProseThead: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseThead.vue' /* webpackChunkName: "components/prose-thead" */).then(c => wrapFunctional(c.default || c)),
  ProseTr: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseTr.vue' /* webpackChunkName: "components/prose-tr" */).then(c => wrapFunctional(c.default || c)),
  ProseUl: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/ProseUl.vue' /* webpackChunkName: "components/prose-ul" */).then(c => wrapFunctional(c.default || c)),
  VideoPlayer: () => import('../../node_modules/docus/dist/defaultTheme/components/atoms/VideoPlayer.vue' /* webpackChunkName: "components/video-player" */).then(c => wrapFunctional(c.default || c)),
  AlgoliaSearchBox: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/AlgoliaSearchBox.vue' /* webpackChunkName: "components/algolia-search-box" */).then(c => wrapFunctional(c.default || c)),
  AsideNavigation: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/AsideNavigation.vue' /* webpackChunkName: "components/aside-navigation" */).then(c => wrapFunctional(c.default || c)),
  AsideNavigationItem: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/AsideNavigationItem.vue' /* webpackChunkName: "components/aside-navigation-item" */).then(c => wrapFunctional(c.default || c)),
  NavigationButton: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/NavigationButton.vue' /* webpackChunkName: "components/navigation-button" */).then(c => wrapFunctional(c.default || c)),
  PoweredByDocus: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/PoweredByDocus.vue' /* webpackChunkName: "components/powered-by-docus" */).then(c => wrapFunctional(c.default || c)),
  SocialIcons: () => import('../../node_modules/docus/dist/defaultTheme/components/molecules/SocialIcons.vue' /* webpackChunkName: "components/social-icons" */).then(c => wrapFunctional(c.default || c)),
  AppAside: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/AppAside.vue' /* webpackChunkName: "components/app-aside" */).then(c => wrapFunctional(c.default || c)),
  AppContainer: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/AppContainer.vue' /* webpackChunkName: "components/app-container" */).then(c => wrapFunctional(c.default || c)),
  AppFooter: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/AppFooter.vue' /* webpackChunkName: "components/app-footer" */).then(c => wrapFunctional(c.default || c)),
  AppHeader: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => wrapFunctional(c.default || c)),
  AppPage: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/AppPage.vue' /* webpackChunkName: "components/app-page" */).then(c => wrapFunctional(c.default || c)),
  BlockFeatures: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/BlockFeatures.vue' /* webpackChunkName: "components/block-features" */).then(c => wrapFunctional(c.default || c)),
  BlockHero: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/BlockHero.vue' /* webpackChunkName: "components/block-hero" */).then(c => wrapFunctional(c.default || c)),
  BlogpostToc: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/BlogpostToc.vue' /* webpackChunkName: "components/blogpost-toc" */).then(c => wrapFunctional(c.default || c)),
  PageBottom: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/PageBottom.vue' /* webpackChunkName: "components/page-bottom" */).then(c => wrapFunctional(c.default || c)),
  PageContent: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/PageContent.vue' /* webpackChunkName: "components/page-content" */).then(c => wrapFunctional(c.default || c)),
  PagePrevNext: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/PagePrevNext.vue' /* webpackChunkName: "components/page-prev-next" */).then(c => wrapFunctional(c.default || c)),
  PageToc: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/PageToc.vue' /* webpackChunkName: "components/page-toc" */).then(c => wrapFunctional(c.default || c)),
  PreLaunchHero: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/PreLaunchHero.vue' /* webpackChunkName: "components/pre-launch-hero" */).then(c => wrapFunctional(c.default || c)),
  Terminal: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/Terminal.vue' /* webpackChunkName: "components/terminal" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsAsideBottom: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/AsideBottom.vue' /* webpackChunkName: "components/dev-slots-aside-bottom" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsAsideTop: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/AsideTop.vue' /* webpackChunkName: "components/dev-slots-aside-top" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsFooterBody: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/FooterBody.vue' /* webpackChunkName: "components/dev-slots-footer-body" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsHeaderNavigation: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/HeaderNavigation.vue' /* webpackChunkName: "components/dev-slots-header-navigation" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsPageTocBottom: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/PageTocBottom.vue' /* webpackChunkName: "components/dev-slots-page-toc-bottom" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsPageTocTop: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/PageTocTop.vue' /* webpackChunkName: "components/dev-slots-page-toc-top" */).then(c => wrapFunctional(c.default || c)),
  DevSlotsSlotBase: () => import('../../node_modules/docus/dist/defaultTheme/components/organisms/dev-slots/SlotBase.vue' /* webpackChunkName: "components/dev-slots-slot-base" */).then(c => wrapFunctional(c.default || c)),
  Blog: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Blog.vue' /* webpackChunkName: "components/blog" */).then(c => wrapFunctional(c.default || c)),
  BlogPost: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/BlogPost.vue' /* webpackChunkName: "components/blog-post" */).then(c => wrapFunctional(c.default || c)),
  Docs: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Docs.vue' /* webpackChunkName: "components/docs" */).then(c => wrapFunctional(c.default || c)),
  Error: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Error.vue' /* webpackChunkName: "components/error" */).then(c => wrapFunctional(c.default || c)),
  Landing: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Landing.vue' /* webpackChunkName: "components/landing" */).then(c => wrapFunctional(c.default || c)),
  Page: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Page.vue' /* webpackChunkName: "components/page" */).then(c => wrapFunctional(c.default || c)),
  PreLaunch: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/PreLaunch.vue' /* webpackChunkName: "components/pre-launch" */).then(c => wrapFunctional(c.default || c)),
  Releases: () => import('../../node_modules/docus/dist/defaultTheme/components/templates/Releases.vue' /* webpackChunkName: "components/releases" */).then(c => wrapFunctional(c.default || c)),
  NuxtContent: () => import('../../node_modules/docus/dist/core/runtime/components/NuxtContent.vue' /* webpackChunkName: "components/nuxt-content" */).then(c => wrapFunctional(c.default || c)),
  Tweet: () => import('../../node_modules/docus/dist/twitter/components/Tweet.vue' /* webpackChunkName: "components/tweet" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
