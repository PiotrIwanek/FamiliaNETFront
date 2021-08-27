import {Category} from 'src/models/Category';
import {FileDTO} from "./FileDTO";

enum Prioryty {
  LOW = 'LOW', MEDIUM ='MEDIUM', HIGH = 'HIGH'

}

export class Post {

  public id: number;
  public name: string;
  public dateTime: Date;
  public priority: string;
  public main: string;
  public category: Category;
  public fileDTOList: FileDTO [];
  public userNames: string [];


  constructor(id: number, name: string, main: string, dateTime: Date, category: Category, priority: string, fileDBList: FileDTO [], userNames: string []) {
    this.id = id;
    this.name = name;
    this.main = main;
    this.dateTime = dateTime;
    this.category = category;
    this.priority = priority;
    this.fileDTOList = FileDTO.listFromData(fileDBList);
    this.userNames = userNames;
  }

  public static fromData(post: Post) {
    return new Post(post.id, post.name, post.main, post.dateTime, post.category, post.priority, post.fileDTOList, post.userNames);
  }

  public static listFromData(postList: Post []) {
    let listToReturn: Post [] = [];
    postList.forEach(post => listToReturn.push(new Post( post.id ,post.name, post.main, post.dateTime, post.category, post.priority, post.fileDTOList, post.userNames)));
    return listToReturn;
  }
}
