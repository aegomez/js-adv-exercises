/**
 * Pre-process list of words in dictionary.txt
 *
 * Word list is based in the 12dicts package by Alan Beale:
 * http://wordlist.aspell.net/12dicts/
 */

const { readFileSync, writeFileSync } = require('fs');

class Node {
  constructor() {
    this._ = ''; // node value
    this.ch = undefined; // node children
  }
}

const text = readFileSync('./dictionary.txt').toString();
const list = text.split(/\s+/);
const tree = new Node();

let node;
let sorted = '';

for (let word of list) {
  node = tree;
  sorted = [...word].sort((a, b) => a.localeCompare(b)).join('');

  for (let char of sorted) {
    if (!node.ch) {
      node.ch = {};
    }
    if (node.ch[char] === undefined) {
      node.ch[char] = new Node();
    }
    node = node.ch[char];
  }
  if (!node._) {
    node._ = word;
  }
}

writeFileSync('./tree.json', JSON.stringify(tree));
