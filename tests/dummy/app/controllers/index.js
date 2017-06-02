import Controller from 'ember-controller'
import computed from 'ember-computed'
import EObject from 'ember-object'
import { A as EArray } from 'ember-array/utils'

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 75%)`
}

const items = EArray([])
for (let i = 0; i < 20; i++) {
  items.addObject(
    EObject.create({
      value: i + 1,
      color: getRandomColor(),
    })
  )
}

export default Controller.extend({
  items,
  currentItemIndex: 0,
  visibleItemAmount: 3,
  maxItemIndex: computed(`items.length`, function () {
    return this.get(`items.length`) - 1
  }),
  isIncrementDisabled: computed(`maxItemIndex`, `currentItemIndex`, function () {
    return this.get(`maxItemIndex`) === this.get(`currentItemIndex`)
  }),
  isDecrementDisabled: computed(`currentItemIndex`, function () {
    return this.get(`currentItemIndex`) === 0
  }),
  actions: {
    next() {
      const item = items.shiftObject()
      items.pushObject(item)
    },
    increment() {
      const isIncrementDisabled = this.get(`isIncrementDisabled`)
      if (isIncrementDisabled) return
      this.incrementProperty(`currentItemIndex`)
    },
    decrement() {
      const isDecrementDisabled = this.get(`isDecrementDisabled`)
      if (isDecrementDisabled) return
      this.decrementProperty(`currentItemIndex`)
    },
  },
})
