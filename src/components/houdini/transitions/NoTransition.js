import TransitionController from '../TransitionController'

class NoTransition extends TransitionController {
  getDomNodes() {
    return { from: {}, to: {} }
  }

  defineShow() {}

  defineHide() {
    window.scrollTo(0, 0)
  }
}

export default NoTransition
