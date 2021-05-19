import { TreeNode } from './TreeNode';
import { Category } from 'src/models/Category';
import { MenuItem } from 'primeng/api';


export class Composit extends Category {

  protected name: string;

  public children : Category[] = [] ;


public add(categort: Composit): void {
  this.children.push(categort);
  categort.setParent(this);

}

public delete(categort: Composit): void {
  const categoryIndex = this.children.indexOf(categort);
  this.children.splice(categoryIndex, 1);

  categort.setParent(null);
}

public setName (name: string) {
  this.name = name;
}

public getName () {
  return this.name;
}

public getCategoryList(){
  const categoryList: Category []=[];


  for (const child of this.children) {
    categoryList.push(child);
    var nestedChild : Category [] = []
    nestedChild= child.getCategoryList();
    categoryList.push.apply(categoryList , nestedChild);
    }

  return categoryList;
}

public print() {
  const results: string [] = [];

        for (const child of this.children) {

            results.push(`Name:${child.getName()} `+ ' children: ' + child.print());
           }

        return `[${results.join(' + ')}]`;
}

public toNodeTree(){

  const json = [] ;
  for (const child of this.children) {
   const jsonChild ={
    "label": child.getName(),
    "data": child.getName(),
    "expandedIcon": "pi pi-folder-open",
    "collapsedIcon": "pi pi-folder",
    "Category": child,
    "children": child.toNodeTree() }

    json.push(jsonChild);
  }
    const finishedJson = { "data" : [ json ] } ;

    var nodeTree: TreeNode [];

    nodeTree = json;

    return nodeTree;
}



toMenuItem (){

  const json = [] ;
  for (const child of this.children) {

    if (child.getChilds().length !== 0){
    const jsonChild ={
    "label": child.getName(),
    "icon": "pi pi-folder",
    "routerLink": ['/news'],
    "command": () => console.log(child.getName()),
    "items": child.toMenuItem()
     }
     json.push(jsonChild);
  }else{
    const jsonChild ={
      "label": child.getName(),
      "icon": "pi pi-folder",
      "routerLink": ['/news'],
      "command": () => console.log(child.getName())

       }
       json.push(jsonChild);
  }
  }
  var menuItem: MenuItem [];

  menuItem = json;

  return menuItem;

}

}



