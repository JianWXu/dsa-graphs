class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = new Set([start]), allNodes = [start.value]) {
    for (let neighbour of start.adjacent) {
      if (!seen.has(neighbour)) {
        seen.add(neighbour);
        allNodes.push(neighbour.value);
        this.depthFirstSearch(neighbour, seen, allNodes);
      }
    }
    return allNodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(
    start,
    seen = new Set([start], (allNodes = [start.value]))
  ) {
    let toVisitQueue = [start];
    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();
      for (let neighbour of currNode.adjacent) {
        if (!seen.has(neighbour)) {
          seen.add(neighbour);
          allNodes.push(neighbour.value);
          toVisitQueue.push(neighbour);
        }
      }
    }
    return allNodes;
  }
}

module.exports = { Graph, Node };
