import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Typography from 'components/typography'
import Link from 'components/shared/Link'

import css from './styles.scss'

export default class About extends Component {
  render() {
    return (
      <div className={css.About}>
        <Helmet>
          <title>About</title>
        </Helmet>
        <Typography title className={css.title}>
          <h1>A propos</h1>
        </Typography>
        <Link name="home">Home</Link>
      </div>
    )
  }
}
