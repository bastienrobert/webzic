import React, { Component } from 'react'
import page from 'page'

import { generateGuid } from 'utils/helpers'
import routes from 'src/app/routes'
import Houdini from 'components/houdini'
import values from 'values'

export default class Router extends Component {
  state = {
    firstPage: true,
    previousRouteName: null,
    previousRoute: null,
    currentRouteName: null,
    currentRoute: null,
    ctx: null,
    pages: []
  }

  static getPath(route) {
    const locale = values.locale
    const find = routes.routes.find(({ name }) => name === route)
    return find ? find.paths[locale] || find.paths['all'] : null
  }

  static goto = path => {
    if (path === page.current) return

    if (path.indexOf('://') === -1) {
      page((path.indexOf('/') === 0 ? '' : '/') + path)
    } else {
      window.location.href = path
    }
  }

  componentWillMount() {
    if (routes.base) page.base(routes.base)

    routes.routes.forEach(route => {
      const { paths } = route
      const path = paths.all || paths[values.locale]

      page(path, ctx => {
        return this.setState(state => {
          return this.getPageData(route, state, ctx)
        }, this.startTransition)
      })
    })

    page.start(routes.opts)
  }

  getPageData(route, state, ctx, replace) {
    const newPage = this.createPage(route.name, ctx.path)
    ctx.name = newPage.route ? newPage.route.name : null
    ctx.pageUid = generateGuid()

    return {
      noContent: false,
      ctx,
      previousRouteName: state.currentRouteName,
      previousRoute: state.currentRoute,
      currentRouteName: ctx.name,
      currentRoute: ctx.path,
      pages: replace ? [newPage] : state.pages.concat(newPage)
    }
  }

  getRouteIndex(path) {
    return this.state.pages.findIndex(page => page.path === path)
  }

  startTransition() {
    const length = this.state.pages.length

    if (length > 1) {
      const previousIndex = this.state.pages.length - 2
      const currentIndex = this.state.pages.length - 1

      if (previousIndex === currentIndex) return
      const currentComponent = this.pages[currentIndex]
      const previousGuid = this.state.pages[previousIndex].guid

      const controller = Houdini.getTransitionController({
        fromContext: {
          page: this.state.pages[previousIndex],
          component: this.pages[previousIndex]
        },
        toContext: {
          page: this.state.pages[currentIndex],
          component: this.pages[currentIndex]
        }
      })

      currentComponent.willAppear && currentComponent.willAppear()
      controller.transition().then(() => {
        currentComponent.didAppear && currentComponent.didAppear()
        this.destroyPage(previousGuid)
      })
    } else {
      const currentIndex = this.getRouteIndex(this.state.currentRoute)
      const component = this.pages[currentIndex]

      const controller = Houdini.getTransitionController({
        toContext: {
          page: this.state.pages[currentIndex],
          component: this.pages[currentIndex]
        }
      })

      component.willAppear && component.willAppear()
      controller.transition().then(() => {
        component.didAppear && component.didAppear()
      })
    }
  }

  renderNotFound = () => {
    this.setState(
      state => {
        return this.getPageData(
          { name: 'notfound' },
          state,
          { path: '*' },
          true
        )
      },
      () => {
        const currentIndex = this.getRouteIndex(this.state.currentRoute)

        const controller = Houdini.getTransitionController({
          toContext: {
            page: this.state.pages[currentIndex],
            component: this.pages[currentIndex]
          }
        })

        controller.transition()
      }
    )
  }

  destroyPage(guid) {
    this.setState(state => ({
      pages: state.pages.filter(page => page.guid !== guid)
    }))
  }

  createPage(name, path) {
    return {
      guid: generateGuid(),
      path,
      route: this.getRouteObject(name)
    }
  }

  getRouteObject(name) {
    return routes.routes.find(route => route.name === name) || null
  }

  savePageRef = (page, guid) => {
    page && this.pages.push({ ref: page, guid })
  }

  render() {
    const { ctx, locale } = this.state

    this.pages = []

    return (
      <React.Fragment>
        {this.state.pages.map(page => {
          return (
            <page.route.component
              key={page.guid}
              ref={el => el && this.savePageRef(el, page.guid)}
              {...{ ctx, locale }}
            />
          )
        })}
      </React.Fragment>
    )
  }
}
