import { cloneDeep, applyStaticArgs, compose } from '../src';

describe('cloneDeep', () => {
  const array = [[1], [2]];

  test('should return the same value', () => {
    expect(cloneDeep(array)).toStrictEqual([[1], [2]]);
  });

  test('should return the same value with the different links', () => {
    expect(cloneDeep(array)).toStrictEqual(array);
    expect(cloneDeep(array)[0]).not.toBe(array[0]);
  });
});

describe('applyStaticArgs', () => {
  test('should return function', () => {
    expect(applyStaticArgs()).toBeInstanceOf(Function);
  });

  test('should return the list of functions with lenght equal 3', () => {
    expect(applyStaticArgs(a => a, a => a, a => a)(null)).toHaveLength(3);
  });

  test('should pass the same value to all funcs', () => {
    const result: Array<Function> = applyStaticArgs(a => a, a => a)(2);

    expect(result[0]()).toEqual(result[1]());
  });

  test('applyStaticArgs(a => a, a => a)(1) should return 2', () => {
    const funcs = applyStaticArgs((a) => a, (a) => a)(1);
    const result = funcs.reduce((acc, fn) => acc + fn(), 0);

    expect(result).toEqual(2);
  });
})

describe('compose', () => {
  test('should return function', () => {
    expect(compose()).toBeInstanceOf(Function);
  });

  test('result of previus func should be as arg for next one', () => {
    expect(compose(a => a + 1, a => a + 1, a => a + 1)(1)).toEqual(4);
  });
});
