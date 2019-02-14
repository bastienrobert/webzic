import React, { Component } from 'react'
import { TweenMax } from 'gsap/all'
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
  componentDidMount() {
    Emitter.on('resize', this.onResize)
  }

  componentDidUpdate() {
    this.onResize()
  }

  componentWillUnmount() {
    Emitter.off('resize', this.onResize)
  }

  onResize = () => {
    if (!this.refs.center || !this.refs.iframe) return
    const { width } = this.refs.center.getBoundingClientRect()
    TweenMax.set(this.refs.iframe, {
      width: width
    })
  }

  render() {
    const { name, socials, slug, experience } = this.props
    if (!experience) return null

    return (
      <div className={css.Preview}>
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
          <Typography name negative className={css.text}>
            <span>{name}</span>
          </Typography>
        </div>
        <div className={css.right}>
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
