import React, { Component } from 'react'
import CSSPlugin from 'gsap/CSSPlugin'

import Router from './Router'

import 'reset-css'
import css from './styles.scss'

const c = CSSPlugin // eslint-disable-line

export default class App extends Component {
  render() {
    return (
      <div id="app" className={css.App}>
        <Router ref="router" />
      </div>
    )
  }
}
