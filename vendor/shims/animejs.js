/* eslint-disable */
(function() {
  function vendorModule() {
    'use strict'
    return { 'default': self['anime'] }
  }

  define('animejs', [], vendorModule)
})()
