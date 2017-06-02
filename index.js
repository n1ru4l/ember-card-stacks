/* eslint-env node */
'use strict'

const path = require(`path`)

const addonDefinition = {
  name: 'ember-card-stacks',
  afterInstall() {
    return this.addPackageToProject(`animejs`)
  },
  included(app) {
    this._super.included.apply(this, arguments)
    this.import(`app/styles/ember-card-stacks.css`)
    this.import(path.join(path.dirname(require.resolve(`animejs`)), `anime.js`))
    this.import(`vendor/shims/animejs.js`)
  },
}

module.exports = addonDefinition
