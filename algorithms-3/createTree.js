/**
 * Pre-process list of words in dictionary.txt
 *
 * Word list is based in the 12dicts package by Alan Beale:
 * http://wordlist.aspell.net/12dicts/
 */

const { readFileSync, writeFileSync } = require('fs');

class Node {
  constructor(value = '') {
    this.v = value; // node value
    this.w = ''; // longest word at node
    this.ch = []; // node children
  }
}

const text = readFileSync('./dictionary.txt').toString();
const list = text.split(/\s+/);
const tree = new Node();

let node;
let next;
let sorted = '';

for (let word of list) {
  node = tree;
  sorted = [...word].sort((a, b) => a.localeCompare(b)).join('');

  for (let char of sorted) {
    next = node.ch.find(child => child.v === char);
    if (next === undefined) {
      next = new Node(char);
      node.ch.push(next);
      node.ch.sort((a, b) => a.v.localeCompare(b.v));
    }
    node = next;
  }
  if (!node.w) {
    node.w = word;
  }
}

writeFileSync('./tree.json', JSON.stringify(tree));
