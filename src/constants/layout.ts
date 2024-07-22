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
  {
    title: 'Sessions',
    icon: 'i-carbon-prompt-session',
    toPath: '/sessions',
  },
  {
    title: 'Environments',
    icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
    toPath: '/environments',
  },
]
