import values from 'values'

import fr from './fr'
import en from './en'

export const all = {
  fr,
  en
}

export default all[values.locale]
