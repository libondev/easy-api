// SIDEBAR
export const SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE = 'visible'
export const SIDEBAR_PANEL_VISIBLE_KEY = 'requester.sidebar.panel.visible'

// PREVIEW PANEL
export const PREVIEW_PANEL_POSITION_DEFAULT_VALUE = 'vertical'
export const PREVIEW_PANEL_POSITION_KEY = 'requester.preview.panel.position'

export const SETTINGS_MENUS = [
  {
    label: 'Options',
    icon: 'i-carbon-http',
    link: '/settings/options',
  },
  {
    label: 'Headers',
    icon: 'i-mdi-code-braces',
    link: '/settings/headers',
  },
  {
    label: 'Sessions',
    icon: 'i-carbon-prompt-session',
    link: '/settings/sessions',
  },
  {
    label: 'Environments',
    icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
    link: '/settings/environments',
  },
]
