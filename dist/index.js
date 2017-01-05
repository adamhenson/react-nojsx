'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nojsx = (function () {
  /**
   * @this {object} data - Data representation of React DOM tree
   *  to be created.
   * @this {number} elementsLength - Number of React elements
   *  created. This is used to set the `key` property for elements.
   */

  function Nojsx(data) {
    (0, _classCallCheck3.default)(this, Nojsx);

    this.data = data;
    this.elementsLength = 0;

    // bind methods to `this`...
    this.createReactChildElement = this.createReactChildElement.bind(this);
  }

  /**
   * Return the element tree (parent, children, siblings).
   */

  (0, _createClass3.default)(Nojsx, [{
    key: 'compile',
    value: function compile() {
      return this.createReactElement(this.data);
    }

    /**
     * Return a React child element.
     */

  }, {
    key: 'createReactChildElement',
    value: function createReactChildElement(data) {
      var isDangerouslyHTMLSet = data.props && data.props.dangerouslySetInnerHTML;

      // if `children` is a string, and `dangerouslySetInnerHTML`
      // is not already set, and `escaped` setting is falsey -
      // let's allow HTML. By default we allow HTML, but to escape
      // it instead - `escaped` option may be set to `true`.
      if (!data.escaped && typeof data.children === 'string' && !isDangerouslyHTMLSet) {
        var childProps = data.props || null;
        return this.createReactElement((0, _extends3.default)({}, data, {
          props: (0, _extends3.default)({}, childProps, {
            dangerouslySetInnerHTML: { __html: data.children }
          })
        }));
      }

      return this.createReactElement(data);
    }

    /**
     * Return a React element. The data object is recursively
     * traversed to create elements for all children.
     */

  }, {
    key: 'createReactElement',
    value: function createReactElement(data) {
      this.elementsLength++;

      var props = (0, _extends3.default)({}, data.props, {
        key: this.elementsLength
      });

      var children = null;
      if (Array.isArray(data.children)) {
        children = data.children.map(this.createReactChildElement);
      }

      return _react2.default.createElement(data.type, props, children);
    }
  }]);
  return Nojsx;
})();

exports.default = Nojsx;
module.exports = exports['default'];
