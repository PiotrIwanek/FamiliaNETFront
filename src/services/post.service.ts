import {Post} from '../models/Post.model';
import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {PostTO} from "../models/PostTO";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL =  environment.URL + 'post';
  // URL =  "http://10.10.8.253:8090/" + 'post';

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
    return this.http.post<PostTO>(this.URL, post);
  }

  public delete (id : string){
    return  this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }


}
