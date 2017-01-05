# NoJSX

<!---
Will add this soon
[![Build Status](https://api.travis-ci.org/adamhenson/http2-pusher.svg?branch=master)](https://travis-ci.org/adamhenson/http2-pusher)
-->
> A JSON based alternative to JSX. Accepts a simple tree object, and returns a React element including any number of children, and children of children.

This mechanism utilizes `React.createElement` from the [React top-level API](https://facebook.github.io/react/docs/react-api.html#createelement), to return one single element with all children element references converted to React elements.

A data object - tree representation of the React DOM to be created is passed into a compile function (see example below), to return the element. Each level in the tree should be an object representation of a React element. This representation is simply based on the arguments accepted by `React.createElement` - `props`, `type`, and `children`. `children` can be a string or an array of element representations. The top level of the tree represents the single React element container.

By default elements are created using [`dangerouslySetInnerHTML`](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml). This can be overridden by using `escaped` element representation property (see example element representation below).

## Installation

```bash
$ npm install react-nojsx --save
```

## Example Element Representation

```javascript
{
  children: 'Hello World.'
  props: {
    className: 'header header--page'
  },
  type: 'div'
}
```

Note: `escaped` is optional. Default is `false`.

## Example Usage

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