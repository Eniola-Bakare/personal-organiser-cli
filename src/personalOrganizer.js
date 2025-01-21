// Personal Organiser App (Array, String, Linked List, and Dynamic Programming)
// Description
// Create a command-line or API based Personal Organiser App that manages tasks and notes using efficient data structures and algorithms.

// Features to Implement:
// I. Task Management System (Array, Sorting)

// Store tasks with properties: title, priority, and dueDate.
// Implement sorting:
// By priority (High to Low).
// By dueDate (Earliest first).
// Allow searching for tasks by keyword (String Matching).

// II. Notes Management (String and Palindrome Check)

// Allow adding, editing, and deleting notes.
// Feature: Detect palindromic sentences in the notes.
// Example:
// Input: "Madam, meet Eve."
// Output: true

// 1. Notes Management (String and Palindrome Check)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class NotesManager {
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

// 2. Task Management System (Array, Sorting)

class Task {
  constructor(taskObj) {
    this.title = taskObj.title;
    this.dueDate = taskObj.date;
    this.priority = taskObj.priority;
  }
}

export default class TaskManager {
  constructor() {
    this.taskManager = [];
  }

  addTask(title, date, priority) {
    const newTask = new Task({ title, date, priority });
    console.log(newTask);
    this.taskManager.push(newTask);
    return this.taskManager;
  }

  sortTaskByPriority() {
    for (let i = 0; i < this.taskManager.length; i++) {
      let minimumIndex = i;

      for (let j = i + 1; j < this.taskManager.length; j++) {
        if (
          this.taskManager[j].priority > this.taskManager[minimumIndex].priority
        ) {
          minimumIndex = j;
        }
      }

      if (minimumIndex !== i) {
        [this.taskManager[minimumIndex], this.taskManager[i]] = [
          this.taskManager[i],
          this.taskManager[minimumIndex],
        ];
      }
    }
    this.printTasks(this.taskManager);
    return this.taskManager;
  }

  sortTaskByDueDate() {
    for (let i = 0; i < this.taskManager.length; i++) {
      let minimumIndex = i;

      for (let j = i + 1; j < this.taskManager.length; j++) {
        if (
          this.taskManager[j].dueDate < this.taskManager[minimumIndex].dueDate
        ) {
          minimumIndex = j;
        }
      }

      if (minimumIndex !== i) {
        [this.taskManager[i], this.taskManager[minimumIndex]] = [
          this.taskManager[minimumIndex],
          this.taskManager[i],
        ];
      }
    }
    this.printTasks(this.taskManager);
    return this.taskManager;
  }

  searchTask(searchString) {
    const result = this.taskManager.filter((eachEl, i) => {
      return eachEl.title.toLowerCase().includes(searchString.toLowerCase());
    });
    console.log(result.length === 0 ? "An empty task manager" : result);
    return result.length === 0 ? "An empty task manager" : result;
  }

  printTasks(array = this.taskManager) {
    console.log(array);
  }
}
// const taskM = new TaskManager();
// taskM.addTask("A Woman", Date.now(), 24);
// taskM.addTask("A Woman", Date.now(), 55);
// taskM.addTask("A Woman", Date.now(), 2);
// taskM.addTask("A Woman hello", Date.now(), 3);
// taskM.printTasks(taskM.array);

// taskM.sortTaskByPriority();
// taskM.sortTaskByDueDate();
// taskM.searchTask("hel");

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
