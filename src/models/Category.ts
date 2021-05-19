import { TreeNode } from './TreeNode';
import { MenuItem } from "primeng/api";

export abstract class Category {

protected name: string;

protected parent: Category;

protected children: Category[];

public add(category: Category): void {}

public delete(category: Category): void {}

public setName (name: string) {
  this.name = name;
}

public getName () : string {
  return this.name;
}

public setParent (parent: Category) {
  this.parent = parent;
}

public getParent () {
  return this.parent;
}

public getChilds(){
  return this.children;
}


public abstract print(): string ;

public abstract toNodeTree(): TreeNode[];
public abstract getCategoryList(): Category[];
public abstract toMenuItem(): MenuItem[];

}
