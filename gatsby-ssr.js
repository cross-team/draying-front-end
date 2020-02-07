const React = require('react')
require(`isomorphic-fetch`)
const wrapRootElement = require('./src/wrap-root-element').default

exports.wrapRootElement = wrapRootElement

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwLTFeBJLrgR7zOb3zbBwRFVWOLZJO0Tw&libraries=places"></script>,
  ])
}
