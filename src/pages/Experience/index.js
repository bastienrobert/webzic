import React, { Component } from 'react'
import classnames from 'classnames/bind'
import { Helmet } from 'react-helmet'
import { querystringToObject } from 'utils/helpers'

import Link from 'components/shared/Link'
import {
  Fullscreen as FullscreenIcon,
  Plus as PlusIcon
} from 'components/icons'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Experience extends Component {
  state = {
    theme: 'dark'
  }

  componentWillMount() {
    const querystring = querystringToObject(this.props.ctx.querystring)
    if (querystring && querystring.theme === 'light')
      this.setState({ theme: querystring.theme })
  }

  render() {
    const negative = this.state.theme === 'dark'
    const componentStyle = cx(css.Experience, {
      negative
    })

    return (
      <div className={componentStyle}>
        <Helmet>
          <title>Experiences</title>
        </Helmet>
        <div className={css.left}>
          <Link href="https://bastienrobert-sound.surge.sh/" external>
            <FullscreenIcon className={css.icon} negative={negative} />
          </Link>
        </div>
        <div className={css.center}>
          <iframe
            src="https://bastienrobert-sound.surge.sh/"
            title="Bastien Robert - Experience"
            className={css.iframe}
            ref="iframe"
          />
        </div>
        <div className={css.right}>
          <Link name={negative ? 'experiences' : 'home'}>
            <PlusIcon className={css.icon} negative={negative} />
          </Link>
        </div>
      </div>
    )
  }
}
