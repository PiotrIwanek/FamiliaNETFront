import {Category} from 'src/models/Category';
import {FileDTO} from "./FileDTO";


export class Post {

  public id: number;
  public name: string;
  public dateTime: Date;
  public prioryty: string;
  public main: string;
  public category: Category;
  public fileDTOList: FileDTO [];
  public userNames: string [];


  constructor(id: number, name: string, main: string, dateTime: Date, category: Category, prioryty: string, fileDBList: FileDTO [], userNames: string []) {
    this.id = id;
    this.name = name;
    this.main = main;
    this.dateTime = dateTime;
    this.category = category;
    this.prioryty = prioryty;
    this.fileDTOList = FileDTO.listFromData(fileDBList);
    this.userNames = userNames;
  }

  public static fromData(post: Post) {
    return new Post(post.id, post.name, post.main, post.dateTime, post.category, post.prioryty, post.fileDTOList, post.userNames);
  }

  public static listFromData(postList: Post []) {
    let listToReturn: Post [] = [];
    postList.forEach(post => listToReturn.push(new Post( post.id ,post.name, post.main, post.dateTime, post.category, post.prioryty, post.fileDTOList, post.userNames)));
    return listToReturn;
  }
}
