import React, { Component } from 'react'
import i18n from 'locales'
import { Helmet } from 'react-helmet'
import experiences from 'app/experiences'

import List from './List'
import Typography from 'components/typography'
import Link from 'components/shared/Link'
import { Plus as PlusIcon } from 'components/icons'

import css from './styles.scss'

export default class Experiences extends Component {
  render() {
    return (
      <div className={css.Experiences}>
        <Helmet>
          <title>Experiences</title>
        </Helmet>
        <div className={css.left} />
        <div className={css.center}>
          <List items={experiences} />
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
