import { createStepsMatrix, createLevenshteinMatrix } from '../src';

describe('createStepsMatrix', () => {
  const strFrom = 'qwe';
  const strTo = 'qwert';

  test('should return array of arrays with lenght is equal strFrom.length + 1', () => {
    expect(createStepsMatrix(strFrom, strTo)).toHaveLength(strFrom.length + 1);
  });

  test('each item of array should have the length equal to strTo.length + 1', () => {
    const result = createStepsMatrix(strFrom, strTo);
    const firstElem = result[0];
    let isEqualAllItemsLenght = true;

    result.forEach(element => {
      if (firstElem.lenght !== element.lenght) {
        isEqualAllItemsLenght = false
      }
    });

    expect(firstElem).toHaveLength(strTo.length + 1);
    expect(isEqualAllItemsLenght).toEqual(true);
  });

  test('should return "clean" matrix', () => {
    const result = createStepsMatrix(strFrom, strTo);
    const matrix = [
      [ 0, 1, 2, 3, 4, 5 ],
      [ 1, 0, 0, 0, 0, 0 ],
      [ 2, 0, 0, 0, 0, 0 ],
      [ 3, 0, 0, 0, 0, 0 ]
    ];
    expect(result).toStrictEqual(matrix);
  });
});


describe('createLevenshteinMatrix', () => {
  const strFrom = 'qwe';
  const strTo = 'qwert';
  const matrix = [
    [ 0, 1, 2, 3, 4, 5 ],
    [ 1, 0, 0, 0, 0, 0 ],
    [ 2, 0, 0, 0, 0, 0 ],
    [ 3, 0, 0, 0, 0, 0 ]
  ];

  test('asd', () => {
    console.log('createLevenshteinMatrix', createLevenshteinMatrix(strFrom, strTo, matrix));
  })
});

