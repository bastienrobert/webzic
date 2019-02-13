import React, { Component } from 'react'
import classnames from 'classnames/bind'

import Typography from 'components/typography'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Refraction extends Component {
  render() {
    const { name, top, bottom } = this.props
    const componentStyle = cx(css.Refraction, {
      top,
      bottom
    })

    return (
      <div className={componentStyle}>
        <Typography title className={css.text}>
          <h1>{name}</h1>
        </Typography>
        <div className={css.duplicates}>
          <Typography title className={css.text}>
            <span>{name}</span>
            <span>{name}</span>
            <span>{name}</span>
          </Typography>
        </div>
      </div>
    )
  }
}
