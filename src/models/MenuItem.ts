import {Category} from 'src/models/Category';


export class MenuItem {


  public label: string;
  public icon: string;
  public routerLink: string;
  public command: Function;
  public items: MenuItem [];
  public categoryId : number;

  constructor(label: string, icon: string, routerLink: string, command: Function, items: Category[], categoryId: number) {


    this.label = label;
    this.icon = icon;
    this.routerLink = routerLink;
    this.command = command;
    items.length === 0 ? this.items = null : this.items = items.map((data) => this.fromCategory(data, command));
    this.categoryId = categoryId;
  }

  fromCategory(category: Category, command: Function) {

    return new MenuItem(category.name, 'pi pi-folder', 'post/', command, category.children , category.id);
  }
}
