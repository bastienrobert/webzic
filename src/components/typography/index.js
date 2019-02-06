import React, { Component } from 'react'
import classnames from 'classnames/bind'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Typography extends Component {
  render() {
    const childrenStyle = cx(this.props.className, this.props.theme, {
      title: this.props.type === 'title',
      subtitle: this.props.type === 'subtitle',
      text: this.props.type === 'text'
    })

    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        className: cx(child.props.className, childrenStyle)
      })
    })
  }
}
