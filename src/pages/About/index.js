import React, { Component } from 'react'
import { TweenMax, Expo } from 'gsap/all'
import { Helmet } from 'react-helmet'
import i18n from 'locales'
import values from 'values'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import Footer from 'components/shared/Footer'
import {
  Plus as PlusIcon,
  Chart as ChartIcon,
  Gobelins as GobelinsIcon
} from 'components/icons'

import css from './styles.scss'

export default class About extends Component {
  progress = 0
  shutter = {}
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
            ((e.clientY - this.mouseOnDown.y) / values.viewport.height) * 2
          ),
          1
        ),
        0
      ) * 40

    this.engine()
  }

  onMouseUp = () => {
    this.progress = 0
    this.engine()
    this.mouseIsDown = false
  }

  engine() {
    TweenMax.to(this.shutter.top, 0.3, {
      yPercent: -this.progress,
      ease: Expo.easeOut
    })
    TweenMax.to(this.shutter.bottom, 0.3, {
      yPercent: this.progress,
      ease: Expo.easeOut
    })
  }

  render() {
    this.shutter = {}

    return (
      <div className={css.About}>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div className={css.left}>
          <Link name="home" className={css.top}>
            <PlusIcon className={css.close} />
            <Typography subtitle className={css.text}>
              <div>
                <span>{i18n.cta.close}</span>
                <span>{i18n.cta.this}</span>
              </div>
            </Typography>
          </Link>
        </div>
        <div
          className={css.center}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}>
          <div className={css.top} ref={el => el && (this.shutter.top = el)}>
            <Typography title className={css.title}>
              <h1>{i18n.about.title}</h1>
            </Typography>
          </div>
          <Typography text className={css.hidden}>
            <span>{i18n.about.coucou}</span>
          </Typography>
          <div
            className={css.bottom}
            ref={el => el && (this.shutter.bottom = el)}>
            <Typography title className={css.title}>
              <h1>{i18n.about.title}</h1>
            </Typography>
          </div>

          <Footer Icon={GobelinsIcon}>{i18n.about.footer}</Footer>
        </div>
        <div className={css.right}>
          <Link name="experiences">
            <ChartIcon legend="23" className={css.top} />
          </Link>
        </div>
      </div>
    )
  }
}
