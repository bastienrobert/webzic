import React, { Component } from 'react'
import { TweenMax } from 'gsap/all'
import Emitter from 'utils/Emitter'

import Item from './Item'

import css from './styles.scss'

export default class List extends Component {
  scroll = 0
  height = 0
  container = {}
  wrapper = {}
  mouseIsDown = false
  mouseOnDown = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    this.onResize()
    this.componentShouldListen()
  }

  componentShouldListen() {
    this.wrapper.el.addEventListener('mousedown', this.onMouseDown)
    this.wrapper.el.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
    Emitter.on('resize', this.onResize)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    this.wrapper.el.removeEventListener('mousedown', this.onMouseDown)
    this.wrapper.el.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
    Emitter.off('resize', this.onResize)
  }

  onResize = () => {
    this.container.height = this.container.el.offsetHeight
    this.wrapper.width = this.wrapper.el.offsetWidth
    this.wrapper.height = this.wrapper.el.offsetHeight
    this.height = this.wrapper.height - this.container.height
    this.engine()
  }

  onMouseDown = e => {
    this.mouseIsDown = true
    this.previousScroll = this.scroll
    this.mouseOnDown = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onMouseMove = e => {
    if (!this.mouseIsDown) return
    this.scroll = this.previousScroll + e.clientY - this.mouseOnDown.y
    this.engine()
  }

  onMouseUp = () => {
    this.mouseIsDown = false
  }

  onWheel = e => {
    this.scroll -= e.deltaY * 1.2
    this.engine()
  }

  engine() {
    if (this.scroll > 0) this.scroll = 0
    if (this.scroll < -this.height) this.scroll = -this.height
    const progress = Math.abs(this.scroll / this.height)
    TweenMax.to(this.wrapper.el, 0.3, {
      y: this.scroll
    })
    TweenMax.to(this.refs.indicator, 0.3, {
      y:
        progress *
          (this.container.height - 70 - (this.wrapper.width / 100) * 30) +
        (this.wrapper.width / 100) * 15
    })
  }

  render() {
    const { items } = this.props

    return (
      <div className={css.List} onWheel={this.onWheel}>
        <div className={css.indicator} ref="indicator" />
        <div
          className={css.container}
          ref={el => el && (this.container.el = el)}>
          <div className={css.wrapper} ref={el => el && (this.wrapper.el = el)}>
            {items.map((item, i) => (
              <Item key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
