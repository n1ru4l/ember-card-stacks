/* eslint-env node */
'use strict'

const path = require(`path`)
const Funnel = require(`broccoli-funnel`)
const MergeTrees = require(`broccoli-merge-trees`)
const addonDefinition = {
  name: `ember-card-stacks`,
  afterInstall() {
    return this.addPackageToProject(`animejs`)
  },
  included() {
    this._super.included.apply(this, arguments)
    this.import(`app/styles/ember-card-stacks.css`)
    this.import(`vendor/anime.min.js`)
    this.import(`vendor/shims/animejs.js`)
  },
  treeForVendor(vendorTree) {
    const animeTree = new Funnel(path.join(this.project.root, `node_modules`, `animejs`), {
      files: [ `anime.min.js` ],
    })
    return new MergeTrees([ vendorTree, animeTree ])
  },
}

module.exports = addonDefinition
