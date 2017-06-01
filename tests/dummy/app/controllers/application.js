import Controller from 'ember-controller'
import EObject from 'ember-object'
import { A as EArray } from 'ember-array/utils'

function getRandomColor() {
  var letters = `0123456789ABCDEF`
  var color = `#`
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
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
      this.incrementProperty(`currentItemIndex`)
    },
  },
})