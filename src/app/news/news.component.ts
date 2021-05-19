import { PostService } from './../../services/post.service';
import { Post } from './../../models/Post.model';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {



  news: Post [];
  text: string;
  newsTitle: string;


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.news = this.postService.posts;
}



}
