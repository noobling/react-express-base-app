import React from 'react';
import Feed from '.';
import { mount } from 'enzyme';

jest.mock('SimpleBar', () => {
  return ({ children }: { children: any }) => <div>{children}</div>;
});

jest.mock('../../authService.tsx', () => ({
  useAuth0() {
    return {
      getTokenSilently: jest.fn(),
      user: jest.fn()
    };
  }
}));

jest.mock('pusher-js');

describe.skip('Feed', () => {
  it('can render correctly', () => {
    const wrapper = mount(<Feed />);
  });
});
