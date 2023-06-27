class Tree { }
class Leaf extends Tree { }
class Branch extends Tree {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
}

function treeToParens(tree) {
  if (tree instanceof Leaf) {
    return '()';
  } else if (tree instanceof Branch) {
    const leftParens = treeToParens(tree.left);
    const rightParens = treeToParens(tree.right);
    return `(${leftParens}${rightParens})`;
  }
}

function parensToTree(parens) {
  const stack = [];
  let i = 0;

  while (i < parens.length) {
    if (parens[i] === '(') {
      stack.push(i);
    } else if (parens[i] === ')') {
      const openIndex = stack.pop();
      if (stack.length === 0) {
        const leftParens = parens.slice(openIndex + 1, i);
        const leftTree = parensToTree(leftParens);
        const rightParens = parens.slice(i + 1);
        const rightTree = parensToTree(rightParens);
        return new Branch(leftTree, rightTree);
      }
    }
    i++;
  }

  return new Leaf();
}

const tree = new Branch(new Leaf(), new Branch(new Leaf(), new Leaf()));
const parens = treeToParens(tree);
console.log(parens);

const reconstructedTree = parensToTree(parens);
console.log(reconstructedTree);
