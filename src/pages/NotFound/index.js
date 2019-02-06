import React, { Component } from 'react'

import Link from 'components/shared/Link'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Not Found</h1>
        <Link name="home">Home</Link>
      </div>
    )
  }
}
