import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  webSrc = 'assets/images/Webz_szary.png';
  znanySrc  = 'assets/images/Znany%20lekarz_szary.png';
  trelloSrc = 'assets/images/Trelo_szary.png'
  news: Post[];

  constructor(private router:  Router , private postService : PostService) { }

  ngOnInit(): void {

    this.postService.getNews().subscribe(data => this.news = data);
  }

  goToLink(url: string){
    window.open(url ,"_blank")

  }

}
