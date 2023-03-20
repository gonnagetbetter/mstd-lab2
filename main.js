'use strict';

class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

class CircularList {
  constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  isChar(element) {
    const type = typeof element;
    if (type === 'string' && element.length === 1) {
      return true;
    } else throw new Error('Error. Wrong input data type, expected type char.');
  }

  getLength() {
      return this.size;
  }

  append(element) {
      if (this.isChar(element)) {
          const node = new Node(element);
          if (!this.head) this.head = node;
          else this.tail.next = node;
          node.next = this.head;
          this.tail = node;
          this.size++;
      } else {
          throw new Error ('Error. Wrong input data type, expected type char.');
      }
  }

  insert(element, index) {
      if (this.isChar(element)) {
          if (index < 0 || index > this.size) throw new Error ('Error. Incorrect index.');;
          const node = new Node(element);
          if (index === 0) {
              node.next = this.head;
              this.head = node;
              this.tail = node;
          } else if (index === this.size) {
              this.tail.next = node;
              this.tail = node;
              node.next = this.head;
          } else {
              let current = this.head;
              for (let i = 0; i < index - 1; i++) {
                  current = current.next;
              }
              node.next = current.next;
              current.next = node;
          }
          this.size++;
      } else {
          throw new Error ('Error. Wrong input data type, expected type char.');
      }
  }

  delete(index) {
      if (index < 0 || index >= this.size)  throw new Error ('Error. Index out of range.') ;
      let deletedItem = null;
      if (this.size === 1) {
          deletedItem = this.head.data;
          this.head = null;
          this.tail = null;
      } else if (index === 0) {
          deletedItem = this.head.data;
          this.head = this.head.next;
          this.tail.next = this.head;
      } else {
          let current = this.head;
          for (let i = 0; i < index - 1; i++) {
              current = current.next;
          }
          deletedItem = current.next.data;
          current.next = current.next.next;
          if (index === this.size - 1) this.tail = current;
      }
      this.size--;
      return deletedItem;
  }

  deleteAll(element) {
      let current = this.head;
      let prev = this.tail;
      for (let i = 0; i < this.size; i++) {
          if (current.data === element) {
              if (i === 0) {
                  this.head = this.head.next;
                  this.tail.next = this.head;
                  prev = this.tail;
              } else {
                  prev.next = current.next;
                  if (i === this.size - 1) this.tail = prev;
              }
              this.size--;
              i--;
          } else {
              prev = current;
          }
          current = current.next;
        }
  }

  getElement(index) {
      if (index < 0 || index >= this.size) throw new Error('Error. Index out of range.');
      let current = this.head;
      for (let i = 0; i < index; i++) {
          current = current.next;
      }
      return current.data;
  }

  clone() {
      const newList = new CircularList();
      let current = this.head;
      for (let i = 0; i < this.size; i++) {
          newList.append(current.data);
          current = current.next;
      }
      return newList;
  }

  reverse() {
      let current = this.head;
      let prev = this.tail;
      for (let i = 0; i < this.size; i++) {
          const next = current.next;
          current.next = prev;
          prev = current;
          current = next;
      }
      this.head = prev;
      if (this.size > 0) this.tail = this.head.next;
  }

  findFirst(element) {
      let current = this.head;
      for (let i = 0; i < this.size; i++) {
          if (current.data === element) return i;
          current = current.next;
      }
      return -1;
  }

  findLast(element) {
      let current = this.head;
      let lastIndex = -1;
      for (let i = 0; i < this.size; i++) {
          if (current.data === element) lastIndex = i;
          current = current.next;
      }
      return lastIndex;
  }

  clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  extend(list) {
    if(list instanceof CircularList) {
      let current = list.head;
      for (let i = 0; i < list.size; i++) {
          this.append(current.data);
          current = current.next;
      }
    } else throw new Error('Error. Your item must be instance of list to extend it.');
  }
}
module.exports = CircularList;