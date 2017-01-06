'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _extends2=require('babel-runtime/helpers/extends'),_extends3=_interopRequireDefault(_extends2),_classCallCheck2=require('babel-runtime/helpers/classCallCheck'),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require('babel-runtime/helpers/createClass'),_createClass3=_interopRequireDefault(_createClass2),_react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NoJSX=function(){/**
   * @this {object} data - Data representation of React DOM tree
   *  to be created.
   * @this {number} elementsLength - Number of React elements
   *  created. This is used to set the `key` property for elements.
   */function NoJSX(a){(0,_classCallCheck3.default)(this,NoJSX),this.data=a,this.elementsLength=0,this.createReactChildElement=this.createReactChildElement.bind(this)}/**
   * Return the element tree (parent, children, siblings).
   */return(0,_createClass3.default)(NoJSX,[{key:'compile',value:function compile(){return this.createReactElement(this.data)}/**
   * Return a React child element.
   */},{key:'createReactChildElement',value:function createReactChildElement(a){var b=a.props&&a.props.dangerouslySetInnerHTML;// if `children` is a string, and `dangerouslySetInnerHTML`
// is not already set, and `escape` setting is falsey -
// let's allow HTML. By default we allow HTML, but to escape
// it instead - `escape` option may be set to `true`.
if(!a.escape&&'string'==typeof a.children&&!b){var c=a.props||null;return this.createReactElement((0,_extends3.default)({},a,{props:(0,_extends3.default)({},c,{dangerouslySetInnerHTML:{__html:a.children}})}))}return this.createReactElement(a)}/**
   * Return a React element. The data object is recursively
   * traversed to create elements for all children.
   */},{key:'createReactElement',value:function createReactElement(a){this.elementsLength++;var b=(0,_extends3.default)({},a.props,{key:this.elementsLength}),c=null;return Array.isArray(a.children)&&(c=a.children.map(this.createReactChildElement)),_react2.default.createElement(a.type,b,c)}}]),NoJSX}();exports.default=NoJSX;module.exports=exports['default'];
