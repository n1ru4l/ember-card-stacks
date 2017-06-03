import Component from 'ember-component'
import layout from '../templates/components/card-item'
import computed from 'ember-computed'
import run from 'ember-runloop'
import { htmlSafe } from 'ember-string'
import anime from 'animejs'

export default Component.extend({
  // template
  tagName: `div`,
  classNames: [ `card-stack-item` ],
  attributeBindings: [ `style` ],
  layout,
  // props
  isInitialRender: true,
  isActive: false,
  isLast: false,
  index: 0,
  wantedVisibleItemAmount: 0,
  visibleItemAmount: 0,
  createFadeAnimation: null,
  createShiftAnimation: null,
  // state
  style: null,
  currentAnimation: null,
  // computed state
  factor: computed(`index`, `visibleItemAmount`, function () {
    const index = this.get(`index`)
    const visibleItemAmount = this.get(`visibleItemAmount`)
    return visibleItemAmount - index
  }),
  // lifecycle
  init(...args) {
    this.shiftCard = this.shiftCard.bind(this)
    const isInitialRender = this.get(`isInitialRender`)
    const factor = this.get(`factor`) - (isInitialRender ? 1 : 0)
    const style = this.getInitialCardStyle(factor)
    this.set(`style`, htmlSafe(style))
    this._super(...args)
  },
  didReceiveAttrs(...args) {
    const currentAnimation = this.get(`currentAnimation`)
    if (currentAnimation) {
      currentAnimation.pause()
    }
    run.scheduleOnce(`afterRender`, this.shiftCard)
    this._super(...args)
  },
  willDestroyElement(...args) {
    if (this.get(`isLast`)) {
      const element = this.element.cloneNode(true)
      element.setAttribute(`id`, null)
      this.element.parentNode.append(element)
      const opts = this.createFadeAnimation()
      opts.targets = element
      anime(opts).finished.then(() => {
        element.remove()
        this.sendAction(`onFadeEnd`)
      })
    }
    this._super(...args)
  },
  // methods
  shiftCard() {
    const opts = this.createShiftAnimation(this.get(`factor`) - 1)
    opts.targets = this.element
    this.set(`currentAnimation`, anime(opts))
  },
})
