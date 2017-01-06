import React from 'react';
import NoJSX from '../src';
import { mount } from 'enzyme';

test('compile() creates a new "div" React element type with text "children".', () => {
  const templateData = {
    children: 'hello world.',
    type: 'div'
  };

  const template = new NoJSX(templateData);
  const newReactElement = template.compile();
  const wrapper = mount(newReactElement);
  const div = wrapper.find('div');

  expect(div.text()).toBe('hello world.');
});

test('compile() creates a new "div" React element type with text "children" and "props".', () => {
  const templateData = {
    children: 'hello world.',
    props: {
      className: 'foobar'
    },
    type: 'div'
  };

  const template = new NoJSX(templateData);
  const newReactElement = template.compile();
  const wrapper = mount(newReactElement);
  const div = wrapper.find('.foobar');

  expect(div.text()).toBe('hello world.');
});

test('compile() creates a new "div" React element and a child element defined in "children"... and "props".', () => {
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

  const template = new NoJSX(templateData);
  const newReactElement = template.compile();
  const wrapper = mount(newReactElement);
  const div = wrapper.find('.foo .bar');

  expect(div.text()).toBe('hello world.');
});

test('compile() creates a new custom React component element type with "props".', () => {
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

  const template = new NoJSX(templateData);
  const newReactElement = template.compile();
  const wrapper = mount(newReactElement);
  const div = wrapper.find('.foobar');

  expect(div.text()).toBe('hello world.');
});
