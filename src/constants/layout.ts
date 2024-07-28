// SIDEBAR
export const SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE = 'visible'
export const SIDEBAR_PANEL_VISIBLE_KEY = 'requester.sidebar.panel.visible'

// PREVIEW PANEL
export const PREVIEW_PANEL_POSITION_DEFAULT_VALUE = 'vertical'
export const PREVIEW_PANEL_POSITION_KEY = 'requester.preview.panel.position'

export interface LinkProp {
  icon: string
  title: string
  label?: string
  toPath: string
}

export const INTERNAL_MENU_LINK: LinkProp[] = [
  {
    title: 'Dashboard',
    icon: 'i-carbon-cyclist',
    toPath: '/',
  },
]
