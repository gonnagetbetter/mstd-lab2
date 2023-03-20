'use strict';

const List = require('./main.js');

describe('length()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must return 0 for an empty list', () => {
    expect(list.getLength()).toEqual(0);
  });

  it('must return the number of elements in the list', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    expect(list.getLength()).toEqual(3);
  });

  it('must return 1 for a list with only one element', () => {
    list.append('a');
    expect(list.getLength()).toEqual(1);
  });
});

describe('append()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must append a new node to an empty list', () => {
    list.append('a');
    expect(list.getElement(0)).toBe('a');
    expect(list.getLength()).toBe(1);
  });

  it('must append a new node to a non-empty list', () => {
    list.append('a');
    list.append('b');
    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getLength()).toBe(2);
  });

  it('must not append a new node to an empty list with incorrect data type', () => {
    expect(() => list.append(1)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append([2])).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append('123')).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append(true)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append(null)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append(undefined)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append(false)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.append({a: 1})).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(list.getLength()).toBe(0);
  });
});

describe('insert()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must insert at the beginning of an empty list', () => {
    list.insert('a', 0);

    expect(list.getElement(0)).toBe('a');
    expect(list.getLength()).toBe(1);
  });

  it('must insert at the beginning of a non-empty list', () => {
    list.append('b');
    list.insert('a', 0);

    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getLength()).toBe(2);
  });

  it('must insert at the end of a non-empty list', () => {
    list.append('a');
    list.insert('b', 1);

    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getLength()).toBe(2);
  });

  it('must insert in the middle of a non-empty list', () => {
    list.append('a');
    list.append('c');
    list.insert('b', 1);

    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getElement(2)).toBe('c');
    expect(list.getLength()).toBe(3);
  });

  it('must not insert at a negative index', () => {
    expect(() => list.insert('b', -1)).toThrow('Error. Incorrect index.');
  });

  it('must not insert at an index greater than the length of the list', () => {
    expect(() => list.insert('a', 10)).toThrow('Error. Incorrect index.');
  });

  it('must insert in the middle of a filled with append() list', () => {
    list.append('a');
    list.append('b');
    list.append('d');
    list.append('e');
    list.append('f');
    list.insert('c', 2);

    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getElement(2)).toBe('c');
    expect(list.getElement(3)).toBe('d');
    expect(list.getElement(4)).toBe('e');
    expect(list.getElement(5)).toBe('f');
    expect(list.getLength()).toBe(6);
  });

  it('must not insert an invalid data type to the begining of the list', () => {
    expect(list.getLength()).toBe(0);

    expect(() => list.insert(1, 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.insert('322', 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.insert(false, 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.insert(undefined, 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.insert(null, 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
    expect(() => list.insert({a: 1}, 0)).toThrow(
        'Error. Wrong input data type, expected type char.',
    );
  });
});

describe('delete())', () => {
  let list;

  beforeEach(() => {
    list = new List();
    list.append('a');
    list.append('b');
    list.append('c');
  });

  test('must remove the item at the specified index', () => {
    const delList = list.delete(1);

    expect(delList).toBe('b');
    expect(list.getLength()).toBe(2);
    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('c');
  });

  test('must remove the first item', () => {
    const delList = list.delete(0);

    expect(delList).toBe('a');
    expect(list.getLength()).toBe(2);
    expect(list.getElement(0)).toBe('b');
    expect(list.getElement(1)).toBe('c');
  });

  test('must remove the last item', () => {

    const delList = list.delete(2);

    expect(delList).toBe('c');
    expect(list.getLength()).toBe(2);
    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
  });

  test('must return error if index is out of range', () => {
    expect(list.getLength()).toBe(3);
    expect(() => list.delete(3)).toThrow('Error. Index out of range.');
  });

  test('must return an empty list', () => {
    list.delete(2);
    list.delete(1);
    list.delete(0);

    expect(list.getLength()).toBe(0);
  });
});

describe('deleteAll', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must remove all nodes with matching data', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    list.append('a');
    list.append('d');
    list.append('a');
    list.deleteAll('a');

    expect(list.getLength()).toBe(3);
    expect(list.getElement(0)).toBe('b');
    expect(list.getElement(1)).toBe('c');
    expect(list.getElement(2)).toBe('d');
  });

  it('must remove all nodes with matching data, even if it is the only node', () => {
    list.append('a');
    list.deleteAll('a');

    expect(list.getLength()).toBe(0);
    expect(() => list.getElement(0)).toThrow('Error. Index out of range.');
  });

  it('must do nothing if no nodes have matching data', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    list.deleteAll('d');

    expect(list.getLength()).toBe(3);
    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getElement(2)).toBe('c');
  });

  it('must do nothing if the list is empty', () => {
    list.deleteAll('a');
    
    expect(list.getLength()).toBe(0);
    expect(() => list.getElement(0)).toThrow('Error. Index out of range.');
  });
});

describe('get()', () => {
  let list;

  beforeEach(() => {
    list = new List();
    list.append('a');
    list.append('b');
    list.append('c');
  });

  it('must throw an Error if the index is less than zero', () => {
    expect(() => list.getElement(-1)).toThrow('Error. Index out of range.');
  });

  it('must throw an Error if the index is greater than or equal to the length of the list', () => {
    expect(() => list.getElement(3)).toThrow('Error. Index out of range.');
  });

  it('must return the data at the specified index', () => {
    expect(list.getElement(0)).toBe('a');
    expect(list.getElement(1)).toBe('b');
    expect(list.getElement(2)).toBe('c');
  });
});

describe('clone()', () => {
  let list;

    beforeEach(() => {
        list = new List();
      });

  it('must return a new list with the same elements', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    const clonedList = list.clone();

    expect(clonedList.getLength()).toEqual(3);
    expect(clonedList.getElement(0)).toEqual('a');
    expect(clonedList.getElement(1)).toEqual('b');
    expect(clonedList.getElement(2)).toEqual('c');
    });

  it('must return an independent list', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    const clonedList = list.clone();
    clonedList.delete(1);

    expect(clonedList.getLength()).toEqual(2);
    expect(list.getLength()).toEqual(3);
  });

  it('must return an empty list if original is empty', () => {
    const clonedList = list.clone();

    expect(clonedList.getLength()).toEqual(0);
  });
});

describe('reverse()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must return a reversed list', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    list.append('d');
    list.reverse();

    expect(list.getElement(0)).toEqual('d');
    expect(list.getElement(1)).toEqual('c');
    expect(list.getElement(2)).toEqual('b');
    expect(list.getElement(3)).toEqual('a');
  });

  it('must return the same list if it contains one item', () => {
    list.append('a');
    list.reverse();

    expect(list.getElement(0)).toEqual('a');
  });

  it('must return the same list if it contains nothing', () => {
    list.reverse();

    expect(list.getLength()).toEqual(0);
  });
});

describe('findFirst()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must return the index of the first occurrence of a data item', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    list.append('d');
    list.append('e');
    list.append('a');

    expect(list.findFirst('a')).toEqual(0);
    expect(list.findFirst('b')).toEqual(1);
    expect(list.findFirst('c')).toEqual(2);
    expect(list.findFirst('d')).toEqual(3);
    expect(list.findFirst('e')).toEqual(4);
  });

  it('must return -1 if the data item is not found', () => {
    list.append('a');
    list.append('b');
    list.append('c');

    expect(list.findFirst('d')).toEqual(-1);
    expect(list.findFirst('e')).toEqual(-1);
    expect(list.findFirst('f')).toEqual(-1);
  });
});

describe('findLast()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must return the index of the last occurrence of the element', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    list.append('a');
    const index = list.findLast('a');

    expect(index).toBe(3);
  });

  it('must return the index of the last occurrence of the element in a list with only one element', () => {
    list.append('a');
    const index = list.findLast('a');

    expect(index).toBe(0);
  });

  it('must return the index of the last occurrence of the element in a list with multiple occurrences', () => {
    list.append('a');
    list.append('a');
    const index = list.findLast('a');

    expect(index).toBe(1);
  });

  it('must return -1 if the element is not found', () => {
    list.append('a');
    list.append('b');
    list.append('c');
    const index = list.findLast('d');

    expect(index).toBe(-1);
  });

  it('must return -1 for an empty list', () => {
    const index = list.findLast('a');

    expect(index).toBe(-1);
  });
});

describe('clear()', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('must remove all elements from the list and reset the length to zero', () => {
    list.append('a');
    list.append('b');
    list.append('c');

    expect(list.getLength()).toBe(3);

    list.clear();

    expect(list.getLength()).toBe(0);
    expect(() => list.getElement(0)).toThrow('Error. Index out of range.');
  });

  it('must work correctly even if the list is already empty', () => {
    expect(list.getLength()).toBe(0);

    list.clear();

    expect(list.getLength()).toBe(0);
  });
});

describe('extend()', () => {

  let list1;
  let list2;

    beforeEach(() => {
        list1 = new List();
        list2 = new List();
      });

  it('must add all elements from the given list to the end of the current list', () => {
    list1.append('a');
    list1.append('b');
    list1.append('c');

    list2.append('d');
    list2.append('e');
    list2.append('f');

    list1.extend(list2);

    expect(list1.getLength()).toEqual(6);
    expect(list1.getElement(0)).toEqual('a');
    expect(list1.getElement(1)).toEqual('b');
    expect(list1.getElement(2)).toEqual('c');
    expect(list1.getElement(3)).toEqual('d');
    expect(list1.getElement(4)).toEqual('e');
    expect(list1.getElement(5)).toEqual('f');
  });

  it('must do nothing if the given list is empty', () => {
    list1.append('a');
    list1.append('b');
    list1.append('c');

    list1.extend(list2);

    expect(list1.getLength()).toEqual(3);
    expect(list1.getElement(0)).toEqual('a');
    expect(list1.getElement(1)).toEqual('b');
    expect(list1.getElement(2)).toEqual('c');
  });

  it('must not modify the given list', () => {
    list1.append('a');
    list1.append('b');
    list1.append('c');

    
    list2.append('d');
    list2.append('e');
    list2.append('f');

    list1.extend(list2);

    expect(list2.getLength()).toEqual(3);
    expect(list2.getElement(0)).toEqual('d');
    expect(list2.getElement(1)).toEqual('e');
    expect(list2.getElement(2)).toEqual('f');
  });

  it('must not extend list with not a list', () => {
    list1.append('a');
    list1.append('b');
    list1.append('c');

    const notList = 'a';

    expect(() => list1.extend(notList)).toThrow(
        'Error. Your item must be instance of list to extend it.');

  });
});
