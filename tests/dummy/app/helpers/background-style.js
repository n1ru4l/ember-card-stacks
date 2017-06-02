import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'
export default Helper.extend({
  compute([ color ]) {
    return htmlSafe(`background-color:${color}`)
  },
})
