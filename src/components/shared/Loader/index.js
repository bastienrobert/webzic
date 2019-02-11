import React, { Component } from 'react'
import { TweenMax, Expo } from 'gsap/all'
import SplitText from 'utils/gsapPlugins/SplitText.js'
import i18n from 'locales'
import values from 'values'

import Typography from 'components/typography'
import Separator from 'components/shared/Separator'

import css from './styles.scss'

export default class Loader extends Component {
  componentDidMount() {
    this.animateIn()
  }

  animateIn() {
    const split = new SplitText(this.refs.title, {
      type: 'chars'
    })
    split.chars.forEach((char, i) => {
      TweenMax.to(
        char,
        1,
        {
          y: i & 1 ? -20 : 20,
          autoAlpha: 0,
          ease: Expo.easeIn
        },
        i * 0.1
      )
    })
  }

  animateOut = () => {
    return new Promise(resolve => {
      TweenMax.to(
        this.refs.component,
        1,
        {
          autoAlpha: 0,
          ease: Expo.easeIn,
          onComplete: () => {
            TweenMax.set(this.refs.component, { display: 'none' })
            resolve()
          }
        },
        0.8
      )
    })
  }

  render() {
    return (
      <div className={css.Loader} ref="component">
        <div className={css.text}>
          <Typography subtitle className={css.subtitle}>
            <h2>{i18n.loader.subtitle}</h2>
          </Typography>
          <Typography title className={css.title}>
            <h1 ref="title">{i18n.loader.title}</h1>
          </Typography>
        </div>
        <Separator />
      </div>
    )
  }
}
