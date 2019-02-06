import React, { Component } from 'react'
import css from './styles.scss'

import Router from './Router'

import Header from 'components/shared/Header'

class App extends Component {
  render() {
    return (
      <div id="app" className={css.App}>
        <Header />
        <div ref={el => (this.pagesContainer = el)}>
          <Router ref="router" />
        </div>
      </div>
    )
  }
}

export default App
