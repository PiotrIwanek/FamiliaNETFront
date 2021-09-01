import {Category} from "./Category";
import {FileTO} from "./FileTO";

export class PostTO {

  private name: string;
  private dateTime: Date;
  private priority: string;
  private main: string;
  private category: Category;
  private fileDBList: FileTO [];
  private userNames: string [];


  constructor(name: string, main: string, dateTime: Date, category: Category, priority: string, fileDBList: FileTO[], userNames: string[]) {
    this.name = name;
    this.main = main;
    this.dateTime = dateTime;
    this.category = category;
    this.priority = priority;
    this.fileDBList = fileDBList;
    this.userNames = userNames;
  }

}
