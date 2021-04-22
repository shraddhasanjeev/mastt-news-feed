class LinkedList {
    constructor() {
        this.head = null;
        this.next = this.head;
    }

    add(node) {
        if (this.head == null) {
            this.head = node;
            this.next = this.head;
        } else {
            this.next.next = node;
            this.next = node;
        }
    }

    search(key) {
        let ptr = this.head;
        while (ptr != null) {
            if (ptr.key == key) {
                return ptr.value;
            } else {
                ptr = ptr.next;
            }
        }
        return null;
    }
}


class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

/* testing
let list = new LinkedList();
list.add(new Node(1, 1));
list.add(new Node(2, 2));
console.log(list.search(3));
console.log(list.search(1));
*/

module.exports = {
    Node,
    LinkedList
};