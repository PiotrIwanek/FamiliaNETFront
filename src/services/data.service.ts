import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from "../models/Post.model";
import {FileDTO} from "../models/FileDTO";



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private logInSource = new BehaviorSubject<boolean>(false)
  currentLogIn = this.logInSource.asObservable();

  private logInDialogSource = new BehaviorSubject<boolean>(false);
  currentLogInDialog = this.logInDialogSource.asObservable();

  private titleSource = new BehaviorSubject<string>('');
  currentTitle = this.titleSource.asObservable();

  private postsSource = new BehaviorSubject<Post[]>([]);
  currentPosts = this.postsSource.asObservable();


  private authorizedSource = new BehaviorSubject<boolean>(false) ;
  currentAuthorized = this.authorizedSource.asObservable();

  private chartFileSource = new BehaviorSubject<FileDTO>(new FileDTO({id: '' , name : '' ,
                                                                  url: 'http://localhost:4200/error', type :' ', size : 3}));
  currentChartFile = this.chartFileSource.asObservable();

  constructor() {
  }

  changeCurrentChartFile ( chartFile : FileDTO){
    this.chartFileSource.next(chartFile);
  }

  changeCurrentLogIn (logIn : boolean){
    this.logInSource.next(logIn);
  }

  changeCurrentLogInDialog ( logInDialog : boolean){
    this.logInDialogSource.next(logInDialog);
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
