import React, { Component } from 'react'

import Link from 'components/shared/Link'

import css from './styles.scss'

export default class NotFound extends Component {
  render() {
    return (
      <div className={css.NotFound}>
        <h1>Not Found</h1>
        <Link name="home">Home</Link>
      </div>
    )
  }
}
