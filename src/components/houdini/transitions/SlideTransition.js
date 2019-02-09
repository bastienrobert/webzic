import ReactDOM from 'react-dom'
import TransitionController from '../TransitionController'

import { Expo, TweenMax } from 'gsap/all'
import values from 'values'

class SlideTransition extends TransitionController {
  getDomNodes(fromView, toView) {
    return {
      from: {
        el: ReactDOM.findDOMNode(fromView)
      },
      to: {
        el: ReactDOM.findDOMNode(toView)
      }
    }
  }

  defineShow(to) {
    this.tl.fromTo(
      to.el,
      0.8,
      {
        opacity: 0,
        y: values.viewport.height / 2,
        skewY: -15
      },
      {
        y: 0,
        skewY: 0,
        opacity: 1,
        ease: Expo.easeOut,
        onComplete: () => {
          TweenMax.set(to.el, { clearProps: 'transform' })
        }
      },
      0.85
    )
  }

  defineHide(from) {
    this.tl.to(
      from.el,
      0.8,
      {
        y: -values.viewport.height / 2,
        skewY: -15,
        opacity: 0,
        ease: Expo.easeIn,
        onComplete: () => {
          window.scrollTo(0, 0)
        }
      },
      0
    )
  }
}

export default SlideTransition
