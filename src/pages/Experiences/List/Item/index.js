import React, { Component } from 'react'

import Typography from 'components/typography'
// import Link from 'components/shared/Link'

import css from './styles.scss'

export default class Item extends Component {
  render() {
    const {
      name
      // slug
    } = this.props

    return (
      <Typography className={css.Item} name negative>
        {/* <Link name="experience" params={{ slug }}> */}
        <span>{name}</span>
        {/* </Link> */}
      </Typography>
    )
  }
}
