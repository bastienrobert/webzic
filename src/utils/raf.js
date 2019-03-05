class RAF {
  constructor(autostart = false) {
    this.requestAnimationID = null
    this.funcs = []

    if (autostart) this.start()
  }

  /**
   * Process method of RAF
   */
  process = () => {
    this.funcs.forEach(func => {
      func && func()
    })
    this.requestAnimationID = window.requestAnimationFrame(this.process)
  }

  /**
   * Start RAF
   */
  start = () => {
    if (this.requestAnimationID === null) {
      this.process()
    }
  }

  /**
   * Add function to RAF and start RAF if needed
   * @param func
   */
  add = func => {
    let index = this.funcs.indexOf(func)
    if (index !== -1) return

    this.funcs.push(func)
    if (this.funcs.length > 0) {
      this.start()
    }
  }

  /**
   * Remove function to RAF and stop RAF if needed
   * @param func
   */
  remove = func => {
    this.funcs = this.funcs.filter(f => {
      return f !== func
    })
    if (this.funcs.length <= 0) {
      this.stop()
    }
  }

  /**
   * Stop RAF
   */
  stop = () => {
    if (this.requestAnimationID) {
      window.cancelAnimationFrame(this.requestAnimationID)
      this.requestAnimationID = null
    }
  }
}

export default new RAF()
