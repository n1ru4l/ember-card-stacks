/* eslint-env node */
'use strict'

const addonDefinition = {
  name: `ember-card-stacks`,
  included() {
    this._super.included.apply(this, arguments)
    this.import(`app/styles/ember-card-stacks.css`)
  },
}

module.exports = addonDefinition
