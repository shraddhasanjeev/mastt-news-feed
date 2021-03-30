const { Node, LinkedList } = require("./LinkedList");

class HashMap {
    constructor() {
        this.map = new Array();
    }

    put(key, value) {
        let hash = hashCode(key);
        if (this.map[hash] == null) {
            this.map[hash] = new LinkedList();
        }
        this.map[hash].add(new Node(key, value));
    }

    get(key) {
        let hash = hashCode(key);
        if (this.map[hash] == null) {
            return null;
        } else {
            return this.map[hash].search(key);
        }
    }
}

/*
 * Convert a string into a hashcode. Based on the number of components is small,
 * currently it uses the same hashcode() in Java for string and uses prime modulus
 * opertation to get the hashcode.
 */ 
function hashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = hash * 31 + key.charCodeAt(i);
    }
    return hash % 61;
}

module.exports = {
    HashMap
};
