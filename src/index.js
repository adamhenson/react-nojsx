import React from 'react';

class NoJSX {
  /**
   * @this {object} data - Data representation of React DOM tree
   *  to be created.
   * @this {number} elementsLength - Number of React elements
   *  created. This is used to set the `key` property for elements.
   */
  constructor(data) {
    this.data = data;
    this.elementsLength = 0;
  }

  /**
   * Return the element tree (parent, children, siblings).
   */
  compile() {
    return this.createReactElement(this.data);
  }

  /**
   * Return a React element. The data object is recursively
   * traversed to create elements for all children.
   */
  createReactElement(data) {
    this.elementsLength++;

    const props = NoJSX.getNewProps(data, this.elementsLength);
    const children = (!Array.isArray(data.children))
      ? data.children
      : data.children.map((child) => this.createReactElement(child));

    // if `dangerouslySetInnerHTML` is set - `children` shouldn't be.
    if (props.dangerouslySetInnerHTML) {
      return React.createElement(data.type, props);
    }

    return React.createElement(data.type, props, children);
  }

  /**
   * Return new `props`. This is necessary to generate a
   * `key` based on the index of the element in the tree.
   * It also assigns `dangerouslySetInnerHTML`.
   */
  static getNewProps(data, key) {
    const isDangerouslyHTMLSet = data.props && data.props.dangerouslySetInnerHTML;
    const props = (!data.props)
      ? { key }
      : { ...data.props, key };
    
    // if `children` is a string, and `dangerouslySetInnerHTML`
    // is not already set, and `escape` setting is falsey -
    // let's allow HTML. By default we allow HTML, but to escape
    // it instead - `escape` option may be set to `true`.
    if (!data.escape && typeof data.children === 'string' && !isDangerouslyHTMLSet) {
      return {
        ...props,
        dangerouslySetInnerHTML: { __html: data.children }
      };
    }

    return props;
  }
}

export default NoJSX;
