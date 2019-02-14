import React, { Component } from 'react'
import { TweenMax } from 'gsap/all'
import Emitter from 'utils/Emitter'
import values from 'values'

import Item from './Item'

import css from './styles.scss'

export default class List extends Component {
  animate = false
  active = null
  scroll = 0
  height = 0
  container = {}
  wrapper = {}
  items = []
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
    document.addEventListener('keydown', this.onKeyDown)
    Emitter.on('resize', this.onResize)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    this.wrapper.el.removeEventListener('mousedown', this.onMouseDown)
    this.wrapper.el.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    Emitter.off('resize', this.onResize)
  }

  onResize = () => {
    this.container.bcr = this.container.el.getBoundingClientRect()
    this.wrapper.bcr = this.wrapper.el.getBoundingClientRect()
    this.wrapper.offset = (this.wrapper.bcr.width / 100) * 15
    this.height = this.wrapper.bcr.height - this.container.bcr.height
    this.active ? this.onItemClick(this.active) : this.engine()
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

  onKeyDown = e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    this.scroll += e.key === 'ArrowDown' ? 20 : -20
    this.engine()
  }

  onWheel = e => {
    this.scroll -= e.deltaY * 1.2
    this.engine()
  }

  reset = () => {
    this.active = null
    this.props.reset()
  }

  onItemClick = id => {
    this.active = id
    this.animate = true
    const item = this.items[id]
    const bcr = item.bcr
    this.scroll =
      values.viewport.height / 2 -
      bcr.height / 2 -
      this.wrapper.offset -
      (bcr.top - this.wrapper.offset) +
      this.scroll
    this.engine(false, this.props.onItemClick)
  }

  mouseOnItem = () => {
    if (this.active) return
    this.items.forEach(item => item.setOpacity(0.3))
  }

  mouseOffItem = () => {
    this.items.forEach(item => item.setOpacity(1))
  }

  engine(check = true, callback) {
    if (check) this.reset()
    if (this.animate && check) return
    if (check && this.scroll > 0) this.scroll = 0
    if (check && this.scroll < -this.height) this.scroll = -this.height
    const progress = check ? Math.abs(this.scroll / this.height) : 0.5
    TweenMax.to(this.wrapper.el, 0.3, {
      y: this.scroll,
      onComplete: () => {
        this.animate = false
        callback && callback()
      }
    })
    TweenMax.to(this.refs.indicator, 0.3, {
      y:
        progress * (this.container.bcr.height - 70 - this.wrapper.offset * 2) +
        this.wrapper.offset
    })
  }

  render() {
    this.items = []
    const { items } = this.props

    return (
      <div className={css.List} onWheel={this.onWheel}>
        <div className={css.indicator} ref="indicator" />
        <div
          className={css.container}
          ref={el => el && (this.container.el = el)}>
          <div className={css.wrapper} ref={el => el && (this.wrapper.el = el)}>
            {items.map((item, i) => (
              <Item
                key={i}
                id={i}
                ref={el => el && this.items.push(el)}
                onItemClick={this.onItemClick}
                mouseOnItem={this.mouseOnItem}
                mouseOffItem={this.mouseOffItem}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
