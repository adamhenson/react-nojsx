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
  createReactElement(elementReference) {
    this.elementsLength++;

    // if element is only a string - let's go ahead and convert
    // it to a <span>.
    const data = (typeof elementReference !== 'string')
      ? elementReference
      : { children: elementReference, type: 'span' };

    const props = NoJSX.getNewProps(data, this.elementsLength);

    let children = null;
    if (Array.isArray(data.children)) {
      // if there is only one child, `children` needs to be an object
      // data type... otherwise we could face issues with `React.Children.only`
      // seen here: https://github.com/facebook/react/issues/4424.
      children = (data.children.length === 1)
        ? this.createReactElement(data.children[0])
        : data.children.map((child) => this.createReactElement(child));
    } else if (typeof data.children === 'object') {
      children = this.createReactElement(data.children);
    }

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
  static getNewProps(elementReference, key) {
    const isDangerouslyHTMLSet = elementReference.props && elementReference.props.dangerouslySetInnerHTML;
    const props = (!elementReference.props)
      ? { key }
      : { ...elementReference.props, key };

    // if `children` is a string, and `dangerouslySetInnerHTML`
    // is not already set, and `escape` setting is falsey -
    // let's allow HTML. By default we allow HTML, but to escape
    // it instead - `escape` option may be set to `true`.
    if (!elementReference.escape && typeof elementReference.children === 'string' && !isDangerouslyHTMLSet) {
      return {
        ...props,
        dangerouslySetInnerHTML: { __html: elementReference.children }
      };
    }

    return props;
  }
}

export default NoJSX;
