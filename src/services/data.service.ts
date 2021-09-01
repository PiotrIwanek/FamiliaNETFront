import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from "../models/Post.model";



@Injectable({
  providedIn: 'root'
})
export class DataService {


  private titleSource = new BehaviorSubject<string>('');
  currentTitle = this.titleSource.asObservable();

  private postsSource = new BehaviorSubject<Post[]>([]);
  currentPosts = this.postsSource.asObservable();


  private authorizedSource = new BehaviorSubject<boolean>(false) ;
  currentAuthorized = this.authorizedSource.asObservable();

  constructor() {
  }

  changeCurrentTitle(title: string) {
    this.titleSource.next(title);
  }

  changePosts(posts : Post[]) {
    this.postsSource.next(posts);
  }

  changeAuthorized (isAuthorized: boolean){
    this.authorizedSource.next(isAuthorized);
  }


}
