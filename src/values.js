import Emitter from 'utils/Emitter'

class Values {
  constructor() {
    this.body = document.body
    this.init()
  }

  init() {
    this.locale = 'en'

    this.viewport = {
      width: 0,
      height: 0
    }

    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  onResize = () => {
    Emitter.emit('resize')
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

export default new Values()
