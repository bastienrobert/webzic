import React, { Component } from 'react'
import { TweenMax } from 'gsap/all'

import Typography from 'components/typography'

import css from './styles.scss'

export default class Item extends Component {
  get bcr() {
    return this.refs.component.getBoundingClientRect()
  }

  onClick = () => {
    this.props.onItemClick(this.props.id)
  }

  onMouseEnter = () => {
    this.props.mouseOnItem()
    this.setOpacity(1)
  }

  onMouseLeave = () => {
    this.props.mouseOffItem()
  }

  setOpacity = opacity => {
    TweenMax.to(this.refs.component, 0.3, {
      opacity
    })
  }

  render() {
    const { name } = this.props

    return (
      <Typography className={css.Item} name negative>
        <span
          onClick={this.onClick}
          ref="component"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          {name}
        </span>
      </Typography>
    )
  }
}
