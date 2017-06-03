import Controller from 'ember-controller'
import computed from 'ember-computed'
import EObject from 'ember-object'
import run from 'ember-runloop'
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

const createCardFadeAnimation1 = () => ({
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
const createCardFadeAnimation2 = () => ({
  translateY: {
    value:1024,
    duration: 350,
  },
  translateX: {
    value: -2050,
    duartion: 350,
  },
  rotate: {
    value: `10deg`,
    duration: 350,
  },
  scale: {
    value: .9,
  },
  opacity: {
    value: .3,
    duration: 350,
  },
  easing: `easeInQuad`,
})

const fadeAnimationFunctions = EArray([
  createCardFadeAnimation1,
  createCardFadeAnimation2,
])

export default Controller.extend({
  items,
  currentItemIndex: 0,
  visibleItemAmount: 3,
  fadeAnimationFunctions,
  currentFadeAnimationFunctionIndex: 0,
  isAnimating: false,
  // computed state
  maxItemIndex: computed(`items.length`, function () {
    return this.get(`items.length`) - 1
  }),
  isIncrementDisabled: computed(`maxItemIndex`, `currentItemIndex`, function () {
    return this.get(`maxItemIndex`) === this.get(`currentItemIndex`)
  }),
  isDecrementDisabled: computed(`currentItemIndex`, function () {
    return this.get(`currentItemIndex`) === 0
  }),
  createCardFadeAnimation: computed(`fadeAnimationFunctions`, `currentFadeAnimationFunctionIndex`, function () {
    const fadeAnimationFunctions = this.get(`fadeAnimationFunctions`)
    const currentFadeAnimationFunctionIndex = this.get(`currentFadeAnimationFunctionIndex`)
    return fadeAnimationFunctions.objectAt(currentFadeAnimationFunctionIndex)
  }),
  actions: {
    next() {
      this.set(`isAnimating`, true)
      this.set(`currentFadeAnimationFunctionIndex`, 0)
      run.next(() => {
        const item = items.shiftObject()
        items.pushObject(item)
      })
    },
    nextAnimated() {
      this.set(`isAnimating`, true)
      this.set(`currentFadeAnimationFunctionIndex`, 1)
      run.next(() => {
        const item = items.shiftObject()
        items.pushObject(item)
      })
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
    onFadeEnd() {
      this.set(`isAnimating`, false)
    },
  },
})
