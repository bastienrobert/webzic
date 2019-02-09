import ReactDOM from 'react-dom'
import TransitionController from '../TransitionController'

import { Expo } from 'gsap/all'

class FadeTransition extends TransitionController {
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
        opacity: 0
      },
      {
        opacity: 1,
        ease: Expo.easeOut
      },
      0.85
    )
  }

  defineHide(from) {
    this.tl.to(
      from.el,
      0.8,
      {
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

export default FadeTransition
