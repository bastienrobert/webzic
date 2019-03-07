import React, { Component } from 'react'
import { TweenMax, TimelineMax, Expo } from 'gsap/all'
import { colors } from 'config'
import Emitter from 'utils/Emitter'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import {
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Cursor as CursorIcon
} from 'components/icons'

import css from './styles.scss'

export default class Preview extends Component {
  init = false
  shutter = {}

  componentDidMount() {
    Emitter.on('resize', this.onResize)
  }

  componentDidUpdate() {
    if (!this.props.experience) {
      this.tl = null
      return
    }
    if (!this.init) this.onResize()
    if (!this.tl) this.initTL()
  }

  initTL() {
    const duration = 0.75
    this.tl = new TimelineMax({
      // prettier-ignore
      onComplete: () => TweenMax.set([this.shutter.left.el, this.shutter.right.el], { autoAlpha: 0 }),
      // prettier-ignore
      onReverse: () => TweenMax.set([this.shutter.left.el, this.shutter.right.el], { autoAlpha: 1 })
    })
    // prettier-ignore
    TweenMax.set([this.shutter.left.el, this.shutter.right.el], { autoAlpha: 1 })
    // prettier-ignore
    this.tl.fromTo(this.shutter.center.top, duration, {
      yPercent: 0
    }, {
      yPercent: 100,
      ease: Expo.easeOut
    }, 0)
    // prettier-ignore
    this.tl.fromTo(this.shutter.center.bottom, duration, {
      yPercent: 0
    }, {
      yPercent: -100,
      ease: Expo.easeOut
    }, 0)
    // prettier-ignore
    this.tl.fromTo(this.shutter.center.insideTop, duration, {
      yPercent: 100
    }, {
      yPercent: 0,
      ease: Expo.easeOut
    }, 0)
    // prettier-ignore
    this.tl.fromTo(this.shutter.center.insideBottom, duration, {
      yPercent: -100
    }, {
      yPercent: 0,
      ease: Expo.easeOut
    }, 0)
    // prettier-ignore
    this.tl.fromTo([this.shutter.left.top, this.shutter.right.top], duration, {
      yPercent: 0
    }, {
      yPercent: -100,
      ease: Expo.easeOut
    }, 0)
    // prettier-ignore
    this.tl.fromTo([this.shutter.left.bottom, this.shutter.right.bottom], duration, {
      yPercent: 0
    }, {
      yPercent: 100,
      ease: Expo.easeOut
    }, 0)
  }

  componentWillUnmount() {
    Emitter.off('resize', this.onResize)
  }

  onResize = () => {
    if (!this.props.experience) return
    const { width } = this.refs.center.getBoundingClientRect()
    TweenMax.set(this.refs.iframe, { width })
    this.init = true
  }

  render() {
    this.shutter = {}
    this.shutter.left = {}
    this.shutter.center = {}
    this.shutter.right = {}

    const { name, socials, slug, experience } = this.props
    if (!experience) return null

    return (
      <div className={css.Preview}>
        <div className={css.left}>
          <div
            className={css.shutter}
            ref={el => el && (this.shutter.left.el = el)}>
            >
            <div
              className={css.top}
              ref={el => el && (this.shutter.left.top = el)}
            />
            <div
              className={css.bottom}
              ref={el => el && (this.shutter.left.bottom = el)}
            />
          </div>
          <div className={css.overlay} />
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
          <div className={css.shutter}>
            <div
              className={css.top}
              ref={el => el && (this.shutter.center.top = el)}>
              <div ref={el => el && (this.shutter.center.insideTop = el)} />
            </div>
            <div
              className={css.bottom}
              ref={el => el && (this.shutter.center.bottom = el)}>
              <div ref={el => el && (this.shutter.center.insideBottom = el)} />
            </div>
          </div>
          <Typography name negative className={css.text}>
            <span>{name}</span>
          </Typography>
        </div>
        <div className={css.right}>
          <div
            className={css.shutter}
            ref={el => el && (this.shutter.right.el = el)}>
            >
            <div
              className={css.top}
              ref={el => el && (this.shutter.right.top = el)}
            />
            <div
              className={css.bottom}
              ref={el => el && (this.shutter.right.bottom = el)}
            />
          </div>
          <Link name="experience" params={{ slug }} className={css.overlay} />
          <iframe
            src={experience}
            title={`${name} - Experience`}
            className={css.iframe}
            ref="iframe"
          />
        </div>
      </div>
    )
  }
}
