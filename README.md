# NoJSX

<!---
Will add this soon
[![Build Status](https://api.travis-ci.org/adamhenson/http2-pusher.svg?branch=master)](https://travis-ci.org/adamhenson/http2-pusher)
-->
> A JSON based alternative to JSX. Accepts a simple tree shaped, DOM representing object, and returns a React element. This element could host any number of children and granchildren defined by a `children` property. The `children` property is either an HTML (or text) string or an array of children element references.

This mechanism utilizes `React.createElement` from the [React top-level API](https://facebook.github.io/react/docs/react-api.html#createelement).

The data object is passed in on construction. The `compile` method (see example below) returns a React element. Each element representation in the tree-like object has properties based on the arguments accepted by `React.createElement`. **There are only 3 properties that are important to set in this element object representation:** `props`, `type`, and `children` (there is one additional property named `escape` described below). `children` can be a string or an array of child element representations. The top level of the tree represents the single React element container.

By default elements are created using [`dangerouslySetInnerHTML`](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml). This can be overridden by using `escape` element representation property (see example below).

## Installation

```bash
$ npm install react-nojsx --save
```

## Example Element Representation

```javascript
{
  children: 'Hello World.',
  escape: true,
  props: {
    className: 'header header--page'
  },
  type: 'div'
}
```

Note: `escape` is optional. Default is `false`.

## Example Usage

NoJSX could be used in several ways, such as in smaller pieces... or even combined with JSX! Below is an example of potentially the most common use case. More examples coming soon.

```javascript
import { Component } from 'react';

// using Helmet as an example React element.
import Helmet from 'react-helmet';
import NoJSX from 'react-nojsx';

export default class App extends Component {

  // ...

  render() {
    const {
      title
    } = this.props;

    const templateData = {
      children: [
        {
          props: {
            title
          },
          type: Helmet
        },
        {
          children: [
            {
              children: 'Hello Page Header.',
              props: {
                className: 'header header--page'
              },
              type: 'h1'
            },
            {
              children: '<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit.',
              type: 'p'
            }
          ],
          props: {
            className: 'jumbotron'
          },
          type: 'div'
        },
      ],
      props: {
        className: 'container container--app'
      },
      type: 'div'
    };
  }

  const template = new NoJSX(templateData);
  return template.compile();
}

```

## Want More?
More documentation, testing and examples coming soon.