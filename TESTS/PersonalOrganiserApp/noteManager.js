class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedLists {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  getLength() {
    console.log(this.length);
    return this.length;
  }

  addNote(note) {
    let node = new Node(note);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
  }
  editNote(value, newValue) {
    if (this.isEmpty()) {
      console.log("Empty List");
      return;
    }
    let current = this.head;
    while (current) {
      // first, search for the note
      if (current.value.toLowerCase().includes(value.toLowerCase())) {
        // second update its value
        return (current.value = newValue);
      } else {
        current = current.next;
      }
    }

    console.log(" No such note exits");

    return;
  }
  deleteNote(index) {
    let counter = 0;
    let current = this.head;
    if (index < 0 || index > this.length) {
      console.log("Invalid index");
      return;
    }

    while (counter < index - 1) {
      current = current.next;
      counter++;
    }
    let nodeToRemove = current.next;
    current.next = nodeToRemove.next;
    this.length--;
  }
  checkPalindrome() {}

  print() {
    let current = this.head;
    let listValues = "";

    while (current) {
      listValues += `${current.value}   `;
      current = current.next;
    }
    console.log(listValues);
    return listValues;
  }
}

const list = new LinkedLists();

list.addNote("Wow !");

list.addNote("voila !");

list.print();

list.editNote("wobw", "CHANGED !");

list.print();

console.log(list);
