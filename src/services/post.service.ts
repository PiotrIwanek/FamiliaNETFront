import {Post} from './../models/Post.model';
import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {PostTO} from "../models/PostTO";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL = 'http://localhost:8080/v1/post';

  date = new Date();

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Post[]>(this.URL);
  }

  getByCategory(categoryId: number) {
    return this.http.get<Post[]>(this.URL + '/byCategory/' + categoryId);
  }

  addPost(post: PostTO) {
    return this.http.post(this.URL, post);
  }

  public delete (id : number){
    return  this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }


}
