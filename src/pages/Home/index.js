import React, { Component } from 'react'

import Link from 'components/shared/Link'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link name="about">About</Link>
      </div>
    )
  }
}
