import React, { Component } from 'react'

import Typography from 'components/typography'

import css from './styles.scss'

export default class Footer extends Component {
  static defaultProps = {
    content: 'text for the footer'
  }

  render() {
    const { Icon, content } = this.props

    return (
      <div className={css.Footer}>
        {Icon && <Icon />}
        <Typography subtitle className={css.text}>
          <span>{content}</span>
        </Typography>
      </div>
    )
  }
}
