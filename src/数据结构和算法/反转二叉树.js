class TreeNode{
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

function reverseBTree(node){
  if(!node){
    return;
  }
  let temp = node.left;
  node.left=node.right;
  node.right=temp;
  reverseBTree(node.left);
  reverseBTree(node.right);
}





class TreeNode{
  constructor(value){
    this.left=null;
    this.right = null;
    this.value = value;
  }
}

function reverseBTree(node){
  if(!node) return;
  let left = node.left;
  node.left = node.right;
  node.right = left;
  reverseBTree(node.left);
  reverseBTree(node.right);
}