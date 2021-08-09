import {Category} from "./Category";
import {FileTO} from "./FileTO";

export class PostTO {
  private id: number;
  private name: string;
  private dateTime: Date;
  private prioryty: string;
  private main: string;
  private category: Category;
  private fileDBList: FileTO [];
  private userNames: string [];


  constructor(name: string, main: string, dateTime: Date, category: Category, prioryty: string, fileDBList: FileTO [], userNames: string []) {
    this.name = name;
    this.main = main;
    this.dateTime = dateTime;
    this.category = category;
    this.prioryty = prioryty;
    this.fileDBList = fileDBList;
    this.userNames = userNames;
  }

}
