import { Command } from "commander";
import inquirer from "inquirer";
import TaskManager from "./personalOrganizer.js";
import NotesManager from "./notesManager.js";
import SocialNetwork from "./SocialNetwork.js";

const program = new Command();
const taskManager = new TaskManager();
const notesManager = new NotesManager();
const socialNetwork = new SocialNetwork();

// Task Management Commands
program
  .command("add-task")
  .description("Add a task")
  .action(async () => {
    const { title, date, priority } = await inquirer.prompt([
      { name: "title", message: "Task Title:" },
      { name: "date", message: "Due Date (YYYY-MM-DD):" },
      { name: "priority", message: "Priority (1-10):", type: "number" },
    ]);
    taskManager.addTask(title, date, priority);
    console.log(taskManager)
    console.log("Task added!");
    return taskManager.printTasks()
  });

program
  .command("list-tasks")
  .description("List all tasks")
  .action(() => taskManager.printTasks());

// Notes Management Commands
program
  .command("add-note")
  .description("Add a note")
  .action(async () => {
    const { note } = await inquirer.prompt([
      { name: "note", message: "Enter your note:" },
    ]);
    notesManager.addNote(note);
    console.log("Note added!");
  });

program
  .command("check-palindromes")
  .description("Check for palindromes in notes")
  .action(() => {
    const { palindromes } = notesManager.checkPalindrome();
    console.log("Palindromes:", palindromes);
  });

// Social Network Commands
program
  .command("add-user")
  .description("Add a user to the social network")
  .action(async () => {
    const { username } = await inquirer.prompt([
      { name: "username", message: "Enter username:" },
    ]);
    socialNetwork.addUser(username);
    console.log("User added!");
  });

program
  .command("add-friend")
  .description("Add a friendship between users")
  .action(async () => {
    const { user1, user2 } = await inquirer.prompt([
      { name: "user1", message: "Enter first username:" },
      { name: "user2", message: "Enter second username:" },
    ]);
    socialNetwork.addFriends(user1, user2);
    console.log("Friendship added!");
  });

// Parse CLI commands
program.parse(process.argv);
