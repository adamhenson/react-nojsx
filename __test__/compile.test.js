import React from 'react';
import NoJSX from '../src';
import renderer from 'react-test-renderer';

const render = (templateData) => {
  const template = new NoJSX(templateData);
  const newReactElement = template.compile();
  
  return renderer.create(newReactElement);
};

describe('compile() creates elements correctly.', () => {
  it('creates a new "div" React element type with text "children".', () => {
    const templateData = {
      children: 'hello world.',
      type: 'div'
    };

    const rendered = render(templateData);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('creates a new "div" React element type with text "children" and "props".', () => {
    const templateData = {
      children: 'hello world.',
      props: {
        className: 'foobar'
      },
      type: 'div'
    };

    const rendered = render(templateData);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('creates a new "div" React element and a child element defined in "children"... and "props".', () => {
    const templateData = {
      children: [
        {
          children: 'hello world.',
          props: {
            className: 'bar'
          },
          type: 'div'
        }
      ],
      props: {
        className: 'foo'
      },
      type: 'div'
    };

    const rendered = render(templateData);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('creates a new custom React component element type with "props".', () => {
    class Greeting extends React.Component {
      render() {
        return <div className={ this.props.className }>hello world.</div>;
      }
    }

    const templateData = {
      props: {
        className: 'foobar'
      },
      type: Greeting
    };

    const rendered = render(templateData);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
