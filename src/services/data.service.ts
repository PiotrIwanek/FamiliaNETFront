import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from "../models/Post.model";



@Injectable({
  providedIn: 'root'
})
export class DataService {


  private titleSource = new BehaviorSubject<string>("Title");
  currentTitle = this.titleSource.asObservable();

  private postsSource = new BehaviorSubject<Post[]>([]);
  currentPosts = this.postsSource.asObservable();


  constructor() {
  }

  changeCurrentTitle(title: string) {
    this.titleSource.next(title);
  }

  changePosts(posts : Post[]) {
    this.postsSource.next(posts);
  }


}
