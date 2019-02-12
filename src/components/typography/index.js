import React, { Component } from 'react'
import classnames from 'classnames/bind'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Typography extends Component {
  render() {
    const childrenStyle = cx(this.props.className, this.props.theme, {
      title: this.props.title,
      name: this.props.name,
      subtitle: this.props.subtitle,
      text: this.props.text,
      negative: this.props.negative
    })

    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        className: cx(child.props.className, childrenStyle)
      })
    })
  }
}
