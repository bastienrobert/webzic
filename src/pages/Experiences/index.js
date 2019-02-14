import React, { Component } from 'react'
import i18n from 'locales'
import { Helmet } from 'react-helmet'
import experiences from 'app/experiences'

import List from './List'
import Preview from './Preview'
import Typography from 'components/typography'
import Link from 'components/shared/Link'
import { Plus as PlusIcon } from 'components/icons'

import css from './styles.scss'

export default class Experiences extends Component {
  active = null
  state = {
    experience: null
  }

  onItemClick = () => {
    const id = this.refs.list.active
    if (id === this.active) return
    this.active = id
    const experience = experiences[id]
    this.setState({ experience })
  }

  reset = () => {
    this.active = null
    this.setState({ experience: null })
  }

  render() {
    const { experience } = this.state

    return (
      <div className={css.Experiences}>
        <Helmet>
          <title>Experiences</title>
        </Helmet>
        <div className={css.left} />
        <div className={css.center}>
          <List
            ref="list"
            items={experiences}
            onItemClick={this.onItemClick}
            reset={this.reset}
          />
          <Preview {...experience} />
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <Link name="home">
              <PlusIcon className={css.close} />
              <Typography subtitle className={css.text}>
                <div>
                  <span>{i18n.cta.close}</span>
                  <span>{i18n.cta.this}</span>
                </div>
              </Typography>
            </Link>
          </div>
          <div className={css.bottom}>
            <Link name="about">
              <PlusIcon />
              <Typography subtitle className={css.text}>
                <div>
                  <span>{i18n.cta.more}</span>
                  <span>{i18n.cta.info}</span>
                </div>
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
