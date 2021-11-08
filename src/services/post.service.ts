import {Post} from '../models/Post.model';
import {Injectable} from '@angular/core';

import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL = environment.URL + 'post';
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

  getNews() {
    return this.http.get<Post[]>(this.URL + '/news');
  }

  addPost(post: Post) {
    return this.http.post<Post>(this.URL, post);
  }

  addNews(post: Post) {
    return this.http.post<Post>(this.URL + '/news', post);
  }

  updatePost(post: Post) {
    return this.http.post<Post>(this.URL, post);
  }

  updateNews(post: Post) {
    return this.http.put<Post>(this.URL + '/unit/' + encodeURIComponent(post.id), post);
  }

  public delete(id: string) {
    return this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }

  public attachToPost(postId: string, fileId: string) {
    let param = new HttpParams()
    .set('fileId', fileId);

    return this.http.put(this.URL + "/addFile/" + encodeURIComponent(postId), param);
  }

  public deleteFromPost(postId: string, fileId: string) {
    let param = new HttpParams()
    .set('fileId', fileId);

    return this.http.put(this.URL + "/deleteFile/" + encodeURIComponent(postId), param);
  }


}
