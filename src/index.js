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

    // bind methods to `this`...
    this.createReactChildElement = this.createReactChildElement.bind(this);
  }

  /**
   * Return the element tree (parent, children, siblings).
   */
  compile() {
    return this.createReactElement(this.data);
  }

  /**
   * Return a React child element.
   */
  createReactChildElement(data) {
    const isDangerouslyHTMLSet = data.props && data.props.dangerouslySetInnerHTML;

    // if `children` is a string, and `dangerouslySetInnerHTML`
    // is not already set, and `escaped` setting is falsey -
    // let's allow HTML. By default we allow HTML, but to escape
    // it instead - `escaped` option may be set to `true`.
    if (!data.escaped && typeof data.children === 'string' && !isDangerouslyHTMLSet) {
      const childProps = data.props || null;
      return this.createReactElement({
        ...data,
        props: {
          ...childProps,
          dangerouslySetInnerHTML: { __html: data.children }
        }
      });
    }

    return this.createReactElement(data);
  }

  /**
   * Return a React element. The data object is recursively
   * traversed to create elements for all children.
   */
  createReactElement(data) {
    this.elementsLength++;

    const props = {
      ...data.props,
      key: this.elementsLength
    };

    let children = null;
    if (Array.isArray(data.children)) {
      children = data.children.map(this.createReactChildElement);
    }

    return React.createElement(data.type, props, children);
  }
}

export default NoJSX;
