import Controller from 'ember-controller'
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
  actions: {
    next() {
      const item = items.shiftObject()
      items.pushObject(item)
    },
  },
})
