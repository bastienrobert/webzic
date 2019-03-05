import React, { Component } from 'react'
import classnames from 'classnames'
import Emitter from 'utils/Emitter'
import raf from 'utils/raf'
import { colors } from 'config'
import values from 'values'

import css from './styles.scss'

export default class Refraction extends Component {
  canvas = null
  ctx = null
  raf = null

  componentDidMount() {
    this.componentShouldListen()
  }

  componentShouldListen() {
    this.onResize()
    Emitter.on('resize', this.onResize)
    this.ctx = this.canvas.getContext('2d')
    raf.add(this.animate)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    Emitter.off('resize', this.onResize)
    raf.remove(this.animate)
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.drawTexts()
    this.drawLine()
  }

  drawLine() {
    this.ctx.save()
    this.ctx.translate(0, this.canvas.height / 2)
    this.ctx.beginPath()
    this.ctx.strokeStyle = colors.silver
    this.ctx.moveTo(0, -0.5)
    this.ctx.lineTo(this.canvas.width, -0.5)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
  }

  drawTexts() {
    this.ctx.textAlign = 'center'
    this.ctx.font = '50px sans-serif'
    this.ctx.textBaseline = 'middle'

    for (let i = 0; i < 5; i++) {
      const y = 0
      this.drawText(y)
    }
  }

  drawText(y) {
    this.ctx.save()
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    const width = this.ctx.measureText(this.props.text).width
    this.ctx.beginPath()
    this.ctx.rect(-width / 2, -50 / 2 + y, width, 50)
    this.ctx.fillStyle = colors.wildSand
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.beginPath()
    this.ctx.fillStyle = colors.mineShaft
    this.ctx.fillText(this.props.text, 0, y)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }

  onResize = () => {
    const { width, height } = values.viewport
    this.canvas.width = width
    this.canvas.height = height
  }

  render() {
    const { className } = this.props
    const componentStyle = classnames(css.Refraction, className)

    return (
      <canvas ref={el => el && (this.canvas = el)} className={componentStyle} />
    )
  }
}
