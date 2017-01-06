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
