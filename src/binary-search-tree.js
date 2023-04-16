const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (data > node.data) {
        node.right = addNode(node.right, data);
      } else {
        node.left = addNode(node.left, data);
      }

      return node;
    }

    this.treeRoot = addNode(this.treeRoot, data);
  }

  has(data) {
    function hasNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data > node.data
        ? hasNode(node.right, data)
        : hasNode(node.left, data);
    }

    return hasNode(this.treeRoot, data);
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data > node.data
        ? findNode(node.right, data)
        : findNode(node.left, data);
    }

    return findNode(this.treeRoot, data);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);

        return node;
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data);

        return node;
      }

      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Replace node data with minimum data from right subtree
      let minRight = node.right;
      while (minRight.left) {
        minRight = minRight.left;
      }

      node.data = minRight.data;
      node.right = removeNode(node.right, minRight.data);

      return node;
    }

    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
