import SlideTransition from './transitions/SlideTransition'
import FadeTransition from './transitions/FadeTransition'
import NoTransition from './transitions/NoTransition'

export const rules = {
  'home->about': NoTransition,
  '->about': FadeTransition,
  default: SlideTransition
}
