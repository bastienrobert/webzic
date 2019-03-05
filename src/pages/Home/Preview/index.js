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
// import Refraction from 'components/shared/Refraction'
import Refraction from './Refraction'

import css from './styles.scss'

export default class Preview extends Component {
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
    document.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    this.componentShouldUnlisten()
  }

  componentShouldUnlisten() {
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
            ((e.clientY - this.mouseOnDown.y) / values.viewport.height) * 3
          ),
          1
        ),
        0
      ) * 40

    this.engine()
  }

  onMouseUp = () => {
    this.progress = this.progress > 20 ? 40 : 0
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

  render() {
    this.shutter = {}
    const { name, experience, socials, slug } = this.props

    return (
      <div
        className={css.Preview}
        ref="component"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}>
        {/* <Refraction text={name} /> */}
        <div className={css.shutter}>
          <div className={css.top} ref={el => el && (this.shutter.top = el)}>
            <Refraction name={name} top />
          </div>
          <div
            className={css.bottom}
            ref={el => el && (this.shutter.bottom = el)}>
            <Refraction name={name} bottom />
          </div>
        </div>
        <div className={css.left}>
          <div className={css.icons} ref="icons">
            {socials.twitter && (
              <Link href={`https://twitter.com/${socials.twitter}`} external>
                <TwitterIcon className={css.icon} color={colors.silver} />
              </Link>
            )}
            {socials.github && (
              <Link href={`https://github.com/${socials.github}`} external>
                <GithubIcon className={css.icon} color={colors.silver} />
              </Link>
            )}
            {socials.website && (
              <Link href={socials.website} external>
                <CursorIcon className={css.cursor} color={colors.silver} />
              </Link>
            )}
          </div>
        </div>
        <div className={css.center} ref="center">
          <Link
            name="experience"
            params={{ slug }}
            querystring={{ theme: 'light' }}>
            <div
              className={css.overlay}
              ref="overlay"
              onClick={this.onOverlayClick}
            />
          </Link>
          <iframe
            src={experience}
            title={`${name} - Experience`}
            className={css.iframe}
            ref="iframe"
          />
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
