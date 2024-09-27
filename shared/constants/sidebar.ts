export type sideBarVariants = 'close' | 'open'

export interface Logos {
  [key: string]: {
    type: 'logo' | 'iso'
    size: number
  }
}

export const logos: Logos = {
  open: {
    type: 'logo',
    size: 67,
  },
  close: { type: 'iso', size: 50 },
}
