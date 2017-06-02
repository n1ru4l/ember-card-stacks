import Component from 'ember-component'
import layout from '../templates/components/card-item'
import computed from 'ember-computed'
import run from 'ember-runloop'
import anime from 'animejs'

const fadeOut = targets => anime({
  targets,
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
}).finished

const moveCard = (targets, factor) => anime({
  targets,
  translateY: factor * -15 + `px`,
  scale: 1 - factor * .05,
  duration: 300,
  easing: `easeOutSine`,
}).finished

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack-item` ],
  layout,
  // props
  isInitialRender: true,
  isActive: false,
  isLast: false,
  index: 0,
  wantedVisibleItemAmount: 0,
  visibleItemAmount: 0,
  // computed state
  factor: computed(`index`, `visibleItemAmount`, function () {
    const index = this.get(`index`)
    const visibleItemAmount = this.get(`visibleItemAmount`)
    return visibleItemAmount - index
  }),
  // lifecycle
  willDestroyElement(...args) {
    if (this.get(`isLast`)) {
      const element = this.element.cloneNode(true)
      element.setAttribute(`id`, null)
      this.element.parentNode.append(element)
      fadeOut(element).then(() => {
        element.remove()
      })
    }
    this._super(...args)
  },
  didReceiveAttrs(...args) {
    const factor = this.get(`factor`) - 1

    run.next(() => {
      moveCard(this.element, factor)
    })
    this._super(...args)
  },
  didInsertElement(...args) {
    const isInitialRender = this.get(`isInitialRender`)
    const factor = this.get(`factor`) - (isInitialRender ? 1 : 0)

    this.element.style.transform = `translateY(${factor * -15}px) scale(${1 - factor * .05})`

    this._super(...args)
  },
})
