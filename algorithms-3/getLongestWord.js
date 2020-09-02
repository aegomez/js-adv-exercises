const tree = require('./tree.json');

const getLongestWord = letters => {
  const sorted = [...letters.toLowerCase()]
    .sort((a, b) => a.localeCompare(b))
    .join('');
  const stack = [];

  let index = 0; // index of next char in "sorted"
  let longest = '';
  let next; // next element from the stack

  stack.push({ node: tree, position: 0 });

  while (stack.length) {
    next = stack.pop();

    // evaluate current node
    if (next.node.w.length > longest.length) {
      longest = next.node.w;
    }
    if (longest.length === sorted.length) {
      return longest;
    }

    // add children nodes to the stack if their value is available
    for (let i = next.node.ch.length - 1; i >= 0; i--) {
      index = sorted.indexOf(next.node.ch[i].v, next.position);
      if (index > -1) {
        stack.push({
          node: next.node.ch[i],
          position: index + 1,
        });
      }
    }
  }

  return longest;
};

module.exports = getLongestWord;
