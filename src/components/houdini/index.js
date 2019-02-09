import { rules } from './config'

class Houdini {
  constructor() {
    this.isTransitioning = false
    this.activeTransition = null
    this.activeTransitionPath = ''
  }

  getOpposite(transitionPath) {
    if (transitionPath.indexOf('<->') !== -1) {
      return transitionPath
    } else if (transitionPath.indexOf('<-') !== -1) {
      return transitionPath.split('<-').join('->')
    } else if (transitionPath.indexOf('->') !== -1) {
      return transitionPath.split('->').join('<-')
    }
  }

  getTransitionController(context) {
    const { fromContext, toContext } = context

    if (fromContext && toContext) {
      const matchingRule =
        Object.keys(rules).filter(rule => {
          if (rule.indexOf('->') === 0) return false
          if (rule.indexOf('<->') !== -1) {
            const contexts = rule.split('<->')
            return (
              (contexts[0] === fromContext.page.route.name &&
                contexts[1] === toContext.page.route.name) ||
              (contexts[1] === fromContext.page.route.name &&
                contexts[0] === toContext.page.route.name)
            )
          } else if (rule.indexOf('<-') !== -1) {
            const contexts = rule.split('<-')

            return (
              contexts[1] === fromContext.page.route.name &&
              contexts[0] === toContext.page.route.name
            )
          } else if (rule.indexOf('->') !== -1) {
            const contexts = rule.split('->')

            return (
              contexts[0] === fromContext.page.route.name &&
              contexts[1] === toContext.page.route.name
            )
          } else {
            return 'default'
          }
        })[0] || 'default'

      if (
        this.getOpposite(this.activeTransitionPath) === matchingRule &&
        this.activeTransition.isActive()
      ) {
        return this.activeTransition
      } else {
        this.activeTransition = new rules[matchingRule](context)
        this.activeTransitionPath = matchingRule

        return this.activeTransition
      }
    } else {
      const matchingRule =
        Object.keys(rules).filter(rule => {
          if (rule.indexOf('->') !== 0) return false
          const contexts = rule.split('->')
          return contexts[1] === toContext.page.route.name
        })[0] || 'default'

      this.activeTransition = new rules[matchingRule](context)
      this.activeTransitionPath = matchingRule

      return this.activeTransition
    }
  }
}

export default new Houdini()
