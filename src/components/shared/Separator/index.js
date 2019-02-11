import React, { Component } from 'react'

import css from './styles.scss'

export default class Separator extends Component {
  render() {
    return <hr className={css.Separator} ref="component" />
  }
}
