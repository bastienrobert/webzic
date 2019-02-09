import SlideTransition from './transitions/SlideTransition'
import FadeTransition from './transitions/FadeTransition'

export const rules = {
  'home->about': FadeTransition,
  '->about': FadeTransition,
  default: SlideTransition
}
