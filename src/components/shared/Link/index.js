import React, { Component } from 'react'
import classnames from 'classnames'

import Router from 'router'

import css from './styles.scss'

export default class Link extends Component {
  static defaultProps = { href: '/' }

  render() {
    const { name, params, href, children, className } = this.props
    const componentStyle = classnames(css.Link, className)

    return (
      <a
        className={componentStyle}
        href={
          name
            ? params
              ? Router.getRouteWithParams(name, { ...params })
              : Router.getPath(name)
            : href
        }>
        {children}
      </a>
    )
  }
}
