/* eslint-env node */
'use strict'

const emberRollup = require(`ember-rollup`)
const runtimeDependencies = [
  `animejs`,
]

const addonDefinition = {
    name: 'ember-card-stacks',
    included: function(app) {
        this._super.included.apply(this, arguments)
        app.import('app/styles/ember-card-stacks.css')
    },
}


module.exports = emberRollup(runtimeDependencies, addonDefinition)
