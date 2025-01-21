// 1. Notes Management (String and Palindrome Check)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class NotesManager {
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
    if (!note.trim()) {
      console.log("Cannot add an empty note.");
      return;
    }
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
        console.log("Note updated");
        return (current.value = newValue);
      } else {
        current = current.next;
      }
    }

    console.log(" No such note exits");

    return false;
  }

  deleteNote(index) {
    let counter = 0;
    let current = this.head;
    let nodeToRemove;
    if (index < 0 || index >= this.length) {
      console.log("Invalid index");
      return;
    }
    if (index === 0) {
      nodeToRemove = this.head;
      this.head = this.head.next;
    } else {
      while (counter < index - 1) {
        current = current.next;
        counter++;
      }
      nodeToRemove = current.next;
      current.next = nodeToRemove.next;
    }
    this.length--;
    console.log("Note successfully deleted", nodeToRemove);
    return nodeToRemove.value;
  }

  checkPalindrome() {
    if (this.isEmpty()) {
      console.log("The list is empty.");
      return;
    }

    let current = this.head;
    const palindromes = [];
    const nonPalindromes = [];

    while (current) {
      let note = current.value;
      const sentences = note.split(/[.!?]/).map((each) => each.trim());

      sentences.forEach((sentence) => {
        const cleanSentence = sentence.replace(/[^a-z0-9]/gi, "").toLowerCase();

        let low = 0;
        let high = cleanSentence.length - 1;
        let isPalindrome = true;
        while (low < high) {
          if (cleanSentence[low] !== cleanSentence[high]) {
            isPalindrome = false;
            break;
          }
          low++;
          high--;
        }
        if (cleanSentence !== "") {
          if (isPalindrome) {
            palindromes.push(sentence);
          } else {
            nonPalindromes.push(sentence);
          }
        }
      });
      current = current.next;
    }

    return { palindromes, nonPalindromes };
  }

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

// Notes:
// const list = new NotesManager();

// list.addNote("Super amazed. a man a plan a canal panama");

// list.addNote("Madam, in Eden, I'm Adam. wow");
// list.addNote("Pen ");

// console.log("HEAD: ", list.head);
// list.deleteNote(0);
// console.log("HEAD: ", list.head);

// list.print();

// list.editNote("wow", "CHANGED !");

// list.print();

// console.log(list);

// console.log(list.checkPalindrome());
