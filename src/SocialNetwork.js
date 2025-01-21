// Social Network Mini-Simulation (Graph, Tree, Queue)
// Description
// Build a simplified Social Network Simulator (API Endpoints or CLI) where users can connect, message, and explore their network using various data structures.
// Features to Implement

// I. Friendship Graph (Graph with BFS and DFS)

// Represent users as nodes and friendships as edges in an undirected graph.
// Implement:
// Breadth-First Search (BFS) to find the shortest path between two users.
// Depth-First Search (DFS) to explore all connected friends of a user.

// II. Message Queue System (Queue Implementation)
// Build a messaging system where users can send and receive messages using a queue.
// Support operations:
// Enqueue a message.
// Dequeue and display the next message.

class User {
  constructor(value) {
    this.userName = value;
    this.unreadMessages = [];
    this.connection = new Set();
  }
}

class Message {
  constructor(sender, text) {
    this.sender = sender;
    this.text = text;
    this.time = new Date();
  }
}

export default class SocialNetwork {
  constructor() {
    this.adjacencyList = {};
  }

  addUser(vertex) {
    if (!this.adjacencyList[vertex]) {
      return (this.adjacencyList[vertex] = new User(vertex)); //new Set());
    }
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return "Vertex non-existent";
    }
    for (let adjacentVertex of this.adjacencyList[vertex].connection) {
      console.log(adjacentVertex);
      this.deleteEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
    return "User deleted";
  }

  addFriends(user1, user2) {
    // 1. check if the vertex already exists, else, add it
    if (!this.adjacencyList[user1]) {
      this.addUser(user1);
    }

    if (!this.adjacencyList[user2]) {
      this.addUser(user2);
    }

    // 2. add the vertexes in undirected graphs
    this.adjacencyList[user1].connection.add(user2);
    this.adjacencyList[user2].connection.add(user1);
  }

  hasFriendship(user1, user2) {
    // console.log("here: ", this.adjacencyList[user1].connection);
    return (
      this.adjacencyList[user1].connection.has(user2) &&
      this.adjacencyList[user2].connection.has(user1)
    );
  }

  deleteEdge(user1, user2) {
    if (!this.hasFriendship(user1, user2)) {
      return "No edge existed prior";
    }
    this.adjacencyList[user1].connection.delete(user2);
    this.adjacencyList[user2].connection.delete(user1);
    return "Edge removed";
  }

  print() {
    for (let vertex in this.adjacencyList) {
      //   console.log(vertex + " => ", [...this.adjacencyList[vertex]]);
      console.log(vertex + " => ", this.adjacencyList[vertex]);
    }
  }

  // find shortest path between two users
  BFS(start, target) {
    if (!this.adjacencyList[start] || !this.adjacencyList[target]) {
      return "One or both of these users do not exist within the network";
    }

    const queue = [start];
    const visited = new Set();
    const parent = {};
    let distance = 0;

    visited.add(start);
    parent[start] = null;

    while (queue.length > 0) {
      const vertex = queue.shift();
      if (vertex === target) {
        const path = [];
        let current = vertex;

        while (current !== null) {
          path.push(current);
          current = parent[current];
        }
        console.log("Distance", distance);
        return path.reverse();
      }

      for (let adjacentVertex of this.adjacencyList[vertex].connection) {
        if (!visited.has(adjacentVertex)) {
          queue.push(adjacentVertex);
          visited.add(adjacentVertex);
          parent[adjacentVertex] = vertex;
          distance++;
        }
      }
    }

    return "No path found";
  }

  // explore all connected friends of a user
  DFS(start) {
    if (!this.adjacencyList[start]) "Start vertex does not exist in the graph.";
    const stack = [start];
    const visited = new Set();
    const result = [];

    visited.add(start);

    while (stack.length > 0) {
      const vertex = stack.pop();
      result.push(vertex);

      for (let adjacentVertex of this.adjacencyList[vertex].connection) {
        if (!visited.has(adjacentVertex)) {
          visited.add(adjacentVertex);
          stack.push(adjacentVertex);
        }
      }
    }
    return result;
  }

  sendMessage(sender, message, receiver) {
    if (!this.adjacencyList[sender] || !this.adjacencyList[receiver])
      "One or both users do not exist in the social network";

    if (this.hasFriendship(sender, receiver)) {
      const messageL = new Message(sender, message);
      this.adjacencyList[receiver].unreadMessages.push(messageL);
      return `Message sent successfully to ${receiver}`;
    }
    return "You don't have a connection with user " + receiver;
  }
  displayMessage(user) {
    if (this.adjacencyList[user].unreadMessages.length < 1) {
      return "You have no unread messages !";
    }

    return this.adjacencyList[user].unreadMessages.shift();
  }
}

// const graph = new SocialNetwork();

// console.log(graph);

// graph.addUser("A");
// graph.addUser("B");
// graph.addUser("C");

// graph.addFriends("A", "B");
// graph.addFriends("B", "C");
// graph.addUser("B");

// // console.log(graph);
// console.log(graph.hasFriendship("A", "B"));
// console.log(graph.sendMessage("A", "WoW !!!", "B"));
// console.log(graph.sendMessage("A", "EHNEHN !!!", "C"));
// console.log(graph.displayMessage("B"));

// console.log(graph.deleteEdge("A", "B"));
// console.log(graph.removeVertex("A"));
// graph.print();
// console.log(graph.BFS("A", "C"));
// console.log('graph.DFS("B")', graph.DFS("C"));

// class MessageQueue {
//   // Build a messaging system where users can send and recieve messages using a queue
//   constructor() {
//     this.messaageQueue = [];
//   }

//   // 1. enqueue a message
//   messageEnqueue() {}

//   messaageDispley() {}
//   // 2. Dequeue and display the message
// }