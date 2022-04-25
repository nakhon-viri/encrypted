class Node {
  // constructor
  constructor(value, encrypted, decrypted, e, d, N) {
    this.value = value;
    this.encrypted = encrypted;
    this.decrypted = decrypted;
    this.e = e;
    this.d = d;
    this.N = N;
    this.next = null;
  }
}
// linkedlist class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // adds an element at the end
  // of list
  add(value, encrypted, decrypted, e, d, N) {
    // creates a new node
    var node = new Node(value, encrypted, decrypted, e, d, N);
 
    // to store current node
    var current;

    // if list is Empty add the
    // element and make it head
    if (this.head == null) this.head = node;
    else {
      current = this.head;
      // iterate to the end of the
      // list
      while (current.next) {
        current = current.next;
      }
      // add node
      current.next = node;
    }
    this.size++;
  }

  // prints the list items
  printList() {
    var curr = this.head;
    while (curr) {
      console.log("input", curr.value);
      console.log("encrypted", curr.encrypted);
      console.log("decrypted", curr.decrypted);
      console.log("e : ", curr.e);
      console.log("d : ", curr.d);
      console.log("N : ", curr.N);
      console.log("++++++++++++++++++++++++++++++++");
      curr = curr.next;
    }
    // console.log(str);
  }
}
module.exports = { LinkedList };
