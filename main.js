'use strict';

class List {
  #list = [];

  isChar(element) {
    const type = typeof element;
    if (type === 'string' && element.length === 1) {
      return true;
    } else throw new Error('Error. Wrong input data type, expected type char.');
  }

  getLength() {
    return this.#list.length;
  }

  append(element) {
    if ( this.isChar(element) ) this.#list.push(element);
  }

  insert(element, index) {
    if ( this.isChar(element) ) {
      if (index < 0 || index > this.#list.length) {
        throw new Error('Error. Incorrect index.');
      }
      this.#list.splice(index, 0, element);
    }
  }

  delete(index) {
    if (index < 0 || index >= this.#list.length) {
      throw new Error('Error. Index out of range.');
    }
    return this.#list.splice(index, 1)[0];
  }

  deleteAll(element) {
    const newList = this.#list.filter((data) => data !== element);
    this.#list = newList;
  }

  getElement(index) {
    if (index < 0 || index >= this.#list.length) {
      throw new Error('Error. Index out of range.');
    }
    return this.#list[index];
  }

  clone() {
    const newList = new List();
    for (let i = 0; i < this.#list.length; i++) {
      newList.append(this.#list[i]);
    }
    return newList;
  }

  reverse() {
    this.#list.reverse();
  }

  findFirst(data) {
    for (let i = 0; i < this.#list.length; i++) {
      if (this.#list[i] === data) return i;
    }
    return -1;
  }

  findLast(data) {
    for (let i = this.#list.length - 1; i >= 0; i--) {
      if (this.#list[i] === data) return i;
    }
    return -1;
  }

  clear() {
    this.#list = [];
  }

  extend(list) {
    if (list instanceof List) {
      for (let i = 0; i < list.getLength(); i++) {
        this.isChar(list.getElement(i));
        this.#list.push(list.getElement(i));
      }
    return this.#list;
  } else throw new Error('Your item must be instance of list to extend it.');
}
}

module.exports = List;