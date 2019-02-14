import React, { Component } from 'react'

import Typography from 'components/typography'

import css from './styles.scss'

export default class Footer extends Component {
  static defaultProps = {
    children: 'text for the footer'
  }

  render() {
    const { Icon, children } = this.props

    return (
      <div className={css.Footer}>
        {Icon && <Icon />}
        <Typography subtitle className={css.text}>
          <span dangerouslySetInnerHTML={{ __html: children }} />
        </Typography>
      </div>
    )
  }
}
