const tree = require('./tree.json');

const getLongestWord = letters => {
  let node = tree;
  let _letters = letters.toLowerCase();
  let available = '';
  let longest = '';

  // const sorted = [...letters.toLowerCase()]
  //   .sort((a, b) => a.localeCompare(b))
  //   .join('');

  // for (char of sorted) {
  //   if (node[char] === undefined) {
  //     break;
  //   }
  //   node = node[char];
  // }

  // return node._ || 'NOT_FOUND';

  const stack = [];
  stack.push(node);
  let char = '';
  let index = 0;

  console.log(stack);

  while (stack.length) {
    node = stack.pop();

    if (node._.length > longest.length) {
      longest = node._;
    }
    if (longest.length === _letters.length) {
      return longest;
    }
    let children = Object.keys(node.ch);
    // if (!children.length)
    // {
    //   available = _letters
    // }

    for (let i = children.length - 1; i >= 0; i--) {
      char = children[i];
      index = available.indexOf(char);
      if (index > -1) {
        available.replace(char, '');
        stack.push(node.ch[char]);
      }
    }
  }

  return longest || 'ERROR';
};

module.exports = getLongestWord;

console.log(getLongestWord('att'));
// console.log(getLongestWord('act'));
// console.log(getLongestWord('cat'));
// console.log(getLongestWord('esratinda'));
// console.log(getLongestWord('MSTUEHNDI'));
