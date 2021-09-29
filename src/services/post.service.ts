import {Post} from '../models/Post.model';
import {Injectable} from '@angular/core';

import {HttpClient, HttpParams} from "@angular/common/http";
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

  updatePost ( post : Post){
    return this.http.post<Post>(this.URL , post);
  }

  public delete (id : string){
    return  this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }

  public attachToPost(postId: string, fileId: string) {
    let param = new HttpParams()
    .set('fileId', fileId);

    return this.http.put(this.URL + "/addFile/" + encodeURIComponent(postId), param);
  }

  public deleteFromPost(postId: string, fileId: string) {
    let param = new HttpParams()
    .set('fileId', fileId);

    return this.http.put(this.URL + "/deleteFile/" +encodeURIComponent(postId), param);
  }



}
