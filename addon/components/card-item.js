import Component from 'ember-component'
import layout from '../templates/components/card-item'
import run from 'ember-runloop'
import anime from 'ember-card-stacks/animejs'

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

function getRandomColor() {
  var letters = `0123456789ABCDEF`
  var color = `#`
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack__item` ],
  classNameBindings: [ `isActive:card-stack__item--current` ],
  attributeBindings: [ `style` ],
  layout,
  // props
  isActive: false,
  isLast: false,
  index: 0,
  visibleItemAmount: 0,
  visibleItemsAmountReal: 0,
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
    const index = this.get(`index`)
    const visibleItemAmount = this.get(`visibleItemAmount`)
    const factor = visibleItemAmount - index - 1

    run.next(() => {
      moveCard(this.element, factor)
    })

    this._super(...args)
  },
  didInsertElement(...args) {
    const index = this.get(`index`)
    const visibleItemAmount = this.get(`visibleItemAmount`)
    const factor = visibleItemAmount - index
    this.element.style.transform = `translateY(${factor * -15}px) scale(${1 - factor * .05})`
    this.element.style.backgroundColor = getRandomColor()

    this._super(...args)
  },
})
