import React, { Component } from 'react'
import { colors } from 'config'
// import values from 'values'

import Typography from 'components/typography'
import {
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Cursor as CursorIcon
} from 'components/icons'

import css from './styles.scss'
// import { TweenMax } from 'gsap/all'

export default class Embed extends Component {
  mouseIsDown = false
  mouseOnDown = {
    x: 0,
    y: 0
  }
  mouse = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    this.componentShouldListen()
  }

  componentShouldListen() {
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseDown = e => {
    this.mouseIsDown = true
    this.mouseOnDown = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onMouseMove = e => {
    this.mouse = {
      x: e.clientX,
      y: e.clientY
    }

    if (!this.mouseIsDown) return
    // Math.min(
    //   (Math.abs(this.mouse.y - this.mouseOnDown.y) / values.viewport.height) *
    //   2,
    //   1
    // )
  }

  onMouseUp = () => {
    this.mouseIsDown = false
  }

  render() {
    const { src, title } = this.props

    return (
      <div className={css.Embed}>
        <div className={css.left}>
          <div className={css.icons}>
            <TwitterIcon className={css.icon} color={colors.silver} />
            <GithubIcon className={css.icon} color={colors.silver} />
            <CursorIcon className={css.icon} color={colors.silver} />
          </div>
        </div>
        <div className={css.center} ref="center">
          <iframe src={src} title={title} className={css.iframe} ref="iframe" />
        </div>
        <div className={css.right}>
          <Typography subtitle className={css.content}>
            <span>name of song, artist</span>
          </Typography>
        </div>
      </div>
    )
  }
}
