import React, { Component } from 'react'
import { TweenMax, Expo } from 'gsap/all'
import { colors } from 'config'
import values from 'values'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import {
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Cursor as CursorIcon
} from 'components/icons'
import Refraction from './Refraction'

import css from './styles.scss'

export default class Embed extends Component {
  shutter = {}
  progress = 0
  iconsAreVisible = false
  mouseIsDown = false
  mouseOnDown = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    this.componentShouldListen()
  }

  componentShouldListen() {
    this.refs.component.addEventListener('mousedown', this.onMouseDown)
    this.refs.component.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
    this.refs.component.removeEventListener('mousedown', this.onMouseDown)
    this.refs.component.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseDown = e => {
    if (e.target === this.refs.overlay) return
    this.mouseIsDown = true
    this.mouseOnDown = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onMouseMove = e => {
    if (!this.mouseIsDown) return
    this.progress =
      Math.max(
        Math.min(
          Math.abs(
            ((e.clientY - this.mouseOnDown.y) / values.viewport.height) * 2
          ),
          1
        ),
        0
      ) * 40

    this.engine()
  }

  onMouseUp = () => {
    this.progress = this.progress > 30 ? 40 : 0
    this.engine(true)
    this.mouseIsDown = false
  }

  engine(ease = false) {
    this.setIconIndex(false)
    TweenMax.to(this.shutter.top, 0.3, {
      yPercent: -this.progress,
      ease: ease ? Expo.easeOut : null
    })
    TweenMax.to(this.shutter.bottom, 0.3, {
      yPercent: this.progress,
      ease: ease ? Expo.easeOut : null,
      onComplete: () => ease && this.progress >= 40 && this.setIconIndex(true)
    })
  }

  setIconIndex(foreground) {
    if (this.iconsAreVisible === foreground) return
    TweenMax.set(this.refs.icons, {
      zIndex: foreground ? 2 : 0
    })
    this.iconsAreVisible = foreground
  }

  onOverlayClick = () => {
    console.log('CLICK ON OVERFLOW')
  }

  render() {
    this.shutter = {}
    const { src, title } = this.props

    return (
      <div className={css.Embed} ref="component">
        <div className={css.shutter}>
          <div className={css.top} ref={el => el && (this.shutter.top = el)}>
            <Refraction top />
          </div>
          <div
            className={css.bottom}
            ref={el => el && (this.shutter.bottom = el)}>
            <Refraction bottom />
          </div>
        </div>
        <div className={css.left}>
          <div className={css.icons} ref="icons">
            <Link href="/">
              <TwitterIcon className={css.icon} color={colors.silver} />
            </Link>
            <Link href="/">
              <GithubIcon className={css.icon} color={colors.silver} />
            </Link>
            <Link href="/">
              <CursorIcon className={css.icon} color={colors.silver} />
            </Link>
          </div>
        </div>
        <div className={css.center} ref="center">
          <div
            className={css.overlay}
            ref="overlay"
            onClick={this.onOverlayClick}
          />
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
