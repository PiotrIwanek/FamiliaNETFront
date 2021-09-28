import {Category} from "./Category";
import {FileTO} from "./FileTO";
import {Post} from "./Post.model";
import {Acceptors} from "./Acceptors";
import {Sign} from "./Sign";

export class PostTO {

  public name: string;
  public dateTime: Date;
  public deadLineDate: Date;
  public shouldBeSign: boolean;
  public priority: string;
  public main: string;
  public category: Category;
  public fileDBList: FileTO[];
  public users: Acceptors[];
  public signs: Sign[];



  constructor(name: string, main: string, dateTime: Date, deadLineDate: Date , shouldBeSign: boolean , category: Category, priority: string,
              fileDBList: FileTO [], users: Acceptors[] , signs: Sign[]) {
    this.name = name;
    this.main = main;
    this.dateTime = dateTime;
    this.deadLineDate = deadLineDate;
    this.shouldBeSign = shouldBeSign;
    this.category = category;
    this.priority = priority;
    this.fileDBList = fileDBList;
    this.users = users;
    this.signs = signs;
  }


  public static fromPost (post : Post){
    return new PostTO(post.name , post.main , post.dateTime , post.deadLineDate, post.shouldBeSign, post.category , post.priority ,
      post.fileDBList , post.users , post.signs);
  }
}
