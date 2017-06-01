import Component from 'ember-component'
// import get from 'ember-metal/get'
// import set from 'ember-metal/set'
import computed from 'ember-computed'
import { A as EArray } from 'ember-array/utils'

// import on from 'ember-evented/on'
import layout from '../templates/components/card-stack'

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack` ],
  layout,
  // props
  items: null,
  visibleItemAmount: null,
  currentItemIndex: 0,
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
})
