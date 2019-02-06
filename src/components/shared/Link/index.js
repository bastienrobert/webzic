import React, { Component } from 'react'

import Router from 'router'

export default class Link extends Component {
  static defaultProps = { href: '/' }

  render() {
    const { name, href, children } = this.props

    return <a href={name ? Router.getPath(name) : href}>{children}</a>
  }
}
