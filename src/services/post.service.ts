import { Category } from 'src/models/Category';
import { Post } from './../models/Post.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post [];
  date = new Date() ;

  constructor() {
    var cat: Category;
    this.posts =[];
    this.posts.push(new Post('TYTUŁ','Coś tam trzeba zrobić kiedyś', this.date ,cat,'alert', []  ));
}

  getNews() {
    var news: Post[];
    news = this.posts;
    return news;
  }

  addPost(newsTitle: string , text : string , cat: Category , priority: string , files: File[] ) {
    this.date = new Date();
    this.posts.push(new Post(newsTitle, text, this.date, cat , priority, files ));
  }


}
