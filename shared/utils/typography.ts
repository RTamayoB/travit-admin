import { TextVariants } from '../constants'

export const getVariantTag = (variant: TextVariants) => {
  switch (variant) {
    case 'bodySmall':
    case 'bodyMedium':
    case 'bodyLarge':
    case 'subtitle':
    case 'note':
    case 'footnote':
    case 'button':
      return 'p'
    default:
      return variant
  }
}
