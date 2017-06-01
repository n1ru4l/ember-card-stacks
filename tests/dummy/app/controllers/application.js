import Controller from 'ember-controller'
import EObject from 'ember-object'
import { A as EArray } from 'ember-array/utils'

export default Controller.extend({
  items: EArray([
    EObject.create({
      value: 1,
    }),
    EObject.create({
      value: 2,
    }),
    EObject.create({
      value: 3,
    }),
    EObject.create({
      value: 4,
    }),
    EObject.create({
      value: 5,
    }),
    EObject.create({
      value: 6,
    }),
    EObject.create({
      value: 7,
    }),
    EObject.create({
      value: 8,
    }),
  ]),
  currentItemIndex: 0,
  visibleItemAmount: 3,
  actions: {
    next() {
      this.incrementProperty(`currentItemIndex`)
    },
  },
})