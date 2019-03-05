import React, { Component } from 'react'
import { TweenMax } from 'gsap/all'
import Emitter from 'utils/Emitter'
import values from 'values'

import Item from './Item'

import css from './styles.scss'

export default class List extends Component {
  animate = false
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
    window.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    Emitter.on('resize', this.onResize)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    window.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    Emitter.off('resize', this.onResize)
  }

  onResize = () => {
    const { active } = this.props

    this.container.bcr = this.container.el.getBoundingClientRect()
    this.wrapper.bcr = this.wrapper.el.getBoundingClientRect()
    this.wrapper.offset = (this.wrapper.bcr.width / 100) * 15
    this.height = this.wrapper.bcr.height - this.container.bcr.height

    active ? this.onItemClick(active) : this.engine()
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

  onClick = e => {
    if (e.target === this.container.el) this.engine()
  }

  onWheel = e => {
    this.scroll -= e.deltaY * 1.2
    this.engine()
  }

  onItemClick = id => {
    this.animate = true
    const item = this.items[id]
    const bcr = item.refs.component.getBoundingClientRect()
    this.scroll =
      values.viewport.height / 2 -
      bcr.height / 2 -
      this.wrapper.offset -
      (bcr.top - this.wrapper.offset) +
      this.scroll

    this.engine(false, () => {
      this.props.onItemClick(id)

      this.items.forEach(item => {
        item.setOpacity(0.3)
      })
    })
  }

  mouseOnItem = id => {
    if (this.props.active !== null) return
    this.items.forEach((item, i) => {
      if (i === id) return
      item.setOpacity(0.3)
    })
  }

  mouseOffItem = () => {
    if (this.props.active !== null) return
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

  reset() {
    this.items.forEach(item => item.setOpacity(1))
    this.props.reset()
  }

  render() {
    this.items = []
    const { items } = this.props

    return (
      <div className={css.List} onWheel={this.onWheel}>
        <div className={css.indicator} ref="indicator" />
        <div
          className={css.container}
          ref={el => el && (this.container.el = el)}
          onClick={this.onClick}>
          <div
            className={css.wrapper}
            ref={el => el && (this.wrapper.el = el)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}>
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
