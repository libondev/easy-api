import { name } from '@/../package.json'

// SIDEBAR
export const SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE = 'visible'
export const SIDEBAR_PANEL_VISIBLE_KEY = `${name}.sidebar.panel.visible`

// PREVIEW PANEL
export const PREVIEW_PANEL_POSITION_DEFAULT_VALUE = 'vertical'
export const PREVIEW_PANEL_POSITION_KEY = `${name}.preview.panel.position`

export const DASHBOARD_TABS_CHECKED_DEFAULT_VALUE = 'header'
export const DASHBOARD_TABS_CHECKED_KEY = `${name}.dashboard.tabs.checked`

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
  // {
  //   label: 'Sessions',
  //   icon: 'i-carbon-prompt-session',
  //   link: '/settings/sessions',
  // },
  {
    label: 'Variables',
    icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
    link: '/settings/variables',
  },
]
