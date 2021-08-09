import {TreeNode} from './TreeNode';
import {MenuItem} from './MenuItem';


export class Category {

  public id: number;

  public name: string;

  public parentId: number;

  public children: Category[];


  constructor(category?: Category) {
    this.id = category && category.id || null;
    this.name = category && category.name || 'Test';
    this.parentId = category && category.parentId || null;
    this.children = category && category.children.map(data => {
      return new Category(data);
    }) || [];
  }


  public add(categort: Category): void {
    this.children.push(categort);
  }

  public delete(categort: Category): void {
    const categoryIndex = this.children.indexOf(categort);
    this.children.splice(categoryIndex, 1);
  }

  public setChildren(composites: Category[]): void {
    for (let child of composites) {
      this.children.push(child);
    }
  }


  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getCategoryList() {
    const categoryList: Category [] = [];


    for (const child of this.children) {
      categoryList.push(child);
      var nestedChild: Category [] = [];
      nestedChild = child.getCategoryList();
      categoryList.push.apply(categoryList, nestedChild);
    }

    return categoryList;
  }


  public print() {
    const results: string [] = [];

    for (const child of this.children) {

      results.push(`Name:${child.getName()} ` + ' children: ' + child.print());
    }

    return `[${results.join(' + ')}]`;
  }


  public toNodeTree() {
    return new TreeNode(this.getName(), this.getName(), 'pi pi-folder-open', 'pi pi-folder-open',
      this.children, this.id, this);
  }


  public toMenuItem(command: Function) {

    return new MenuItem(this.name, 'pi pi-folder', 'news/', command, this.children ,this.id);

  }

}



