import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Link from 'components/shared/Link'
import {
  Fullscreen as FullscreenIcon,
  Plus as PlusIcon
} from 'components/icons'

import css from './styles.scss'

export default class Experience extends Component {
  render() {
    return (
      <div className={css.Experience}>
        <Helmet>
          <title>Experiences</title>
        </Helmet>
        <div className={css.left}>
          <Link href="https://bastienrobert-sound.surge.sh/">
            <FullscreenIcon className={css.icon} />
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
          <Link name="home">
            <PlusIcon className={css.icon} />
          </Link>
        </div>
      </div>
    )
  }
}
