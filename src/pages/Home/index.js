import React, { Component } from 'react'

import Typography from 'components/typography'
import Link from 'components/shared/Link'

import css from './styles.scss'

export default class Home extends Component {
  render() {
    return (
      <div className={css.Home}>
        <Typography title className={css.title}>
          <h1>Home</h1>
        </Typography>
        <Link name="about">About</Link>
      </div>
    )
  }
}
