import { add, sub } from '@lerna-demo/utils';

describe('utils', () => {

  it('should add two numbers', () => {
    expect(add(2, 4)).toBe(6);
  });

  it('should subtract two numbers', () => {
    expect(sub(2, 4)).toBe(-2);
  });

});
