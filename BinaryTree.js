// Node class
class Node {
  constructor(value, encrypted, decrypted, e, d, N) {
    this.value = value;
    this.encrypted = encrypted;
    this.decrypted = decrypted;
    this.e = e;
    this.d = d;
    this.N = N;
    this.left = null;
    this.right = null;
  }
}

// Binary Search tree class
class BinarySearchTree {
  constructor() {
    // root of a binary search tree
    this.root = null;
  }

  // function to be implemented
  // helper method which creates a new node to
  // be inserted and calls insertNode
  insert(value, encrypted, decrypted, e, d, N) {
    // Creating a node and initialising
    // with data
    var newNode = new Node(value, encrypted, decrypted, e, d, N);

    // root is null then node will
    // be added to the tree and made root.
    if (this.root === null) this.root = newNode;
    // find the correct position in the
    // tree and add the node
    else this.insertNode(this.root, newNode);
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location
  // to insert a node with a given data
  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.encrypted < node.data) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) node.right = newNode;
      // if right is not null recur until
      // null is found
      else this.insertNode(node.right, newNode);
    }
  }

  // Helper function
  // finds the minimum node in tree
  // searching starts from given node
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  // returns root of the tree
  getRootNode() {
    return this.root;
  }

  // Performs inorder traversal of a tree
  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log("input", node.value);
      console.log("encrypted", node.encrypted);
      console.log("decrypted", node.decrypted);
      console.log("e : ", node.e);
      console.log("d : ", node.d);
      console.log("N : ", node.N);
      console.log("++++++++++++++++++++++++++++++++");
      this.inorder(node.right);
    }
  }
  // Performs preorder traversal of a tree
  preorder(node) {
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }
  // Performs postorder traversal of a tree
  postorder(node) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  // search for a node with given data
  search(node, data) {
    // if trees is empty return null
    if (node === null) return null;
    // if data is less than node's data
    // move left
    else if (data < node.data) return this.search(node.left, data);
    // if data is less than node's data
    // move left
    else if (data > node.data) return this.search(node.right, data);
    // if data is equal to the node data
    // return node
    else return node;
  }
}
module.exports = { BinarySearchTree };
