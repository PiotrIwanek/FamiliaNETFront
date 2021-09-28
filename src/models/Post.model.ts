
import {Category} from 'src/models/Category';
import {FileDTO} from "./FileDTO";
import {Acceptors} from "./Acceptors";
import {Sign} from "./Sign";

enum Prioryty {
  LOW = 'LOW', MEDIUM ='MEDIUM', HIGH = 'HIGH'

}

export class Post {

  public id: string;
  public name: string;
  public dateTime: Date;
  public deadLineDate: Date;
  public shouldBeSign: boolean;
  public priority: string;
  public main: string;
  public category: Category;
  public fileDBList: FileDTO[];
  public users: Acceptors[];
  public signs: Sign[];


  constructor(id: string, name: string, main: string, dateTime: Date, deadLineDate: Date , shouldBeSign: boolean , category: Category, priority: string,
              fileDBList: FileDTO [], users: Acceptors[] , signs: Sign[]) {
    this.id = id;
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

  public static fromData(post: Post) {
    return new Post(post.id, post.name, post.main, post.dateTime, post.deadLineDate, post.shouldBeSign, post.category, post.priority,
      post.fileDBList, post.users , post.signs );
  }

  public static listFromData(postList: Post []) {
    let listToReturn: Post [] = [];
    postList.forEach(post => listToReturn.push(new Post( post.id, post.name, post.main, post.dateTime, post.deadLineDate, post.shouldBeSign, post.category, post.priority,
      post.fileDBList, post.users , post.signs )));
    return listToReturn;
  }
}
