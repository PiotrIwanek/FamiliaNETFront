import { Category } from 'src/models/Category';
import { Composit } from 'src/models/Composit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  tree = new Composit;

  constructor() { }

  createCategory (name: string , parent: Category) {
    var category = new Composit;
    category.setName(name);
    parent.add(category);
  }

  delete (category: Category) {
  category.getParent().delete(category);
  }

  getAll () {
   return this.tree.getCategoryList();
  }

  getByIndex (parent: Composit , index : number){
    return parent.children[index];
  }

}
