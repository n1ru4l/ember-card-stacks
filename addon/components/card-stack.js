import Component from 'ember-component'
import computed from 'ember-computed'
import { A as EArray } from 'ember-array/utils'
import run from 'ember-runloop'

import layout from '../templates/components/card-stack'

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack` ],
  layout,
  // props
  items: null,
  visibleItemAmount: 3,
  currentItemIndex: 0,
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
})
