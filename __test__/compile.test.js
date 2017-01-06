import React from 'react';
import NoJSX from '../src';
import { mount } from 'enzyme';

test('compile() creates a new "div" React element with only text content (children).', () => {
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
