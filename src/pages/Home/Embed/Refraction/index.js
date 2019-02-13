import React, { Component } from 'react'
import classnames from 'classnames/bind'

import Typography from 'components/typography'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Refraction extends Component {
  render() {
    const { top, bottom } = this.props
    const componentStyle = cx(css.Refraction, {
      top,
      bottom
    })

    return (
      <div className={componentStyle}>
        <Typography title className={css.text}>
          <h1>John doe</h1>
        </Typography>
        <div className={css.duplicates}>
          <Typography title className={css.text}>
            <span>John doe</span>
            <span>John doe</span>
            <span>John doe</span>
          </Typography>
        </div>
      </div>
    )
  }
}
