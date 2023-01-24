let tree = [
    {name: "Одежда", left: 1, right: 22, lvl: 0},
    {name: "Мужская", left: 2, right: 9, lvl: 1},
    {name: "Женская", left: 10, right: 21, lvl: 1},
    {name: "Костюмы", left: 3, right: 8, lvl: 2},
    {name: "Брюки", left: 4, right: 5, lvl: 3},
    {name: "Куртки", left: 6, right: 7, lvl: 3},
    {name: "Платья", left: 11, right: 16, lvl:2},
    {name: "Юбки", left: 17, right: 18, lvl: 2},
    {name: "Блузки", left: 19, right: 20, lvl: 2},
    {name: "Вечерние платья", left: 12, right: 13, lvl: 3},
    {name: "Сарафаны", left: 14, right: 15, lvl: 3},
];

let c = tree.find((c)=>c.name === "Мужская");

//get childs
let childs = tree.filter((item)=>c.left < item.left && c.right > item.right);
console.log("simple get childs", childs);

//add node
let node = {"name": "Бабочки"};
c = tree[0];
let local_tree = tree.filter((item)=>c.left < item.left && c.right > item.right);
let deep = (c) => {
	let childs = local_tree.filter((item)=>c.left < item.left && c.right > item.right && item.lvl === c.lvl + 1);
	c.childrens = [];
	childs.forEach((ch)=>{
		c.childrens.push(ch);
		deep(ch);
	});
	if(c.name === "Женская"){
		c.childrens.push(node);
	}
}
deep(c)
//reindex
tree = []; 
let counter = 1;
let lvl_counter = 0;
let create_nested_set = (node) => {
    node.left = counter++;
    node.lvl = lvl_counter++;
    node?.childrens?.forEach((item)=>{
        create_nested_set(item);
    })
    lvl_counter--;
    node.right = counter++
    tree.push(node);
}
create_nested_set(c);

console.log("reindex tree", tree)

//get childs
c = tree.find((c)=>c.name === "Женская");
childs = tree.filter((item)=>c.left < item.left && c.right > item.right);
console.log("select childs from reindex tree", childs);


//get all parent

c = tree.find((c)=>c.name === "Бабочки");
childs = tree.filter((item)=>c.left > item.left && c.right < item.right);
console.log("select parent from reindex tree", childs);

//create tree without depth
tree = [
    {name: "Одежда", left: 1, right: 22, lvl: 0},
    {name: "Мужская", left: 2, right: 9, lvl: 1},
    {name: "Женская", left: 10, right: 21, lvl: 1},
    {name: "Костюмы", left: 3, right: 8, lvl: 2},
    {name: "Брюки", left: 4, right: 5, lvl: 3},
    {name: "Куртки", left: 6, right: 7, lvl: 3},
    {name: "Платья", left: 11, right: 16, lvl:2},
    {name: "Юбки", left: 17, right: 18, lvl: 2},
    {name: "Блузки", left: 19, right: 20, lvl: 2},
    {name: "Вечерние платья", left: 12, right: 13, lvl: 3},
    {name: "Сарафаны", left: 14, right: 15, lvl: 3},
];
//
let count = 1;
let c_right = [];
let c_left = tree.find((item)=>item.left === count);
let stack = [c_left];
while(c_left || c_right){
    count++;
    c_left = tree.find((item)=>item.left === count);
    if(c_left){
        if(!stack[stack.length-1]?.childrens){
            stack[stack.length-1].childrens = [];
        }
        stack[stack.length-1].childrens.push(c_left);
        stack.push(c_left);
    }
    c_right = tree.find((item)=>item.right === count);
    if(c_right){
        if(stack.length !== 1){
            stack.pop();
        }
    }
}
console.log("without depth", stack[0])
