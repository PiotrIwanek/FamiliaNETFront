import { Category } from 'src/models/Category';


export class Post {

  public id : string;
  public title: string;
  public main: string;
  public date: Date;
  public prioryty: string;
  public category: Category;
  public files: File [];


  constructor (title: string, main: string  , date: Date , cat: Category , prioryty: string, files: File []){
    this.title = title;
    this.main = main;
    this.date = date;
    this.category = cat;
    this.prioryty = prioryty;
    this.files = files; 
  }

}
