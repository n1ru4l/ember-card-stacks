import Component from 'ember-component'
import computed from 'ember-computed'
import { A as EArray } from 'ember-array/utils'
import run from 'ember-runloop'

import layout from '../templates/components/card-stack'

const createCardFadeAnimation = () => ({
  translateX: {
    value: 1024,
    duration: 350,
  },
  rotate: {
    value: `10deg`,
    duration: 350,
  },
  opacity: {
    value: .3,
    duration: 200,
  },
  easing: `easeInQuad`,
})

const createCardShiftAnimation = (factor) => ({
  translateY: factor * -15 + `px`,
  scale: 1 - factor * .05,
  duration: 300,
  easing: `easeOutSine`,
})

const getInitialCardStyle = (factor) => `transform: translateY(${factor * -15}px) scale(${1 - factor * .05});`

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack` ],
  layout,
  // props
  items: null,
  visibleItemAmount: 3,
  currentItemIndex: 0,
  createCardFadeAnimation,
  createCardShiftAnimation,
  getInitialCardStyle,
  // state
  isInitialRender: true,
  // computed state
  currentItem: computed(`currentItemIndex`, `items.[]`, function () {
    const currentItemIndex = this.get(`currentItemIndex`)
    const items = this.get(`items`)
    return items.objectAt(currentItemIndex)
  }),
  visibleItems: computed(`currentItemIndex`, `visibleItemAmount`, `items.[]`, function () {
    const items = this.get(`items`)
    const currentItemIndex = this.get(`currentItemIndex`)
    const visibleItemAmount = this.get(`visibleItemAmount`)
    const activeItems = EArray(items.slice(currentItemIndex, currentItemIndex + visibleItemAmount))
    activeItems.reverse()
    return activeItems
  }),
  // lifecycle
  didInsertElement() {
    run.next(() => {
      this.set(`isInitialRender`, false)
    })
  },
  actions: {
    onFadeEnd() {
      this.sendAction(`onFadeEnd`)
    },
  },
})
