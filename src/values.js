class Values {
  constructor() {
    this.body = document.body
    this.init()
  }

  init() {
    this.locale = 'fr'

    this.viewport = {
      width: 0,
      height: 0
    }

    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

export default new Values()