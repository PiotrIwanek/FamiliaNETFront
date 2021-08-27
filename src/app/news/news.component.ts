import {PostService} from './../../services/post.service';
import {Post} from './../../models/Post.model';
import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/services/category.service';
import {DataService} from 'src/services/data.service';
import {DomSanitizer} from "@angular/platform-browser";
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  title: string;

  news: Post[] = [];

  items: MenuItem[];

  selectedPost: Post;

  authorized: boolean;


  constructor(private postService: PostService, private catService: CategoryService, private dataService: DataService
    , private sanitizer: DomSanitizer) {
    this.getPost();

  }

  ngOnInit(): void {
    this.dataService.currentTitle.subscribe(((data) => this.title = data));
    this.dataService.currentPosts.subscribe((data: Post []) => this.news = Post.listFromData(data));
    this.dataService.currentAuthorized.subscribe( data => this.authorized = data);
    this.items = [
      {label: 'Delete', icon: 'pi pi-fw pi-trash' , command: () => this.deletePost(this.selectedPost.id)},
      {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}]
  }

  getPost() {
    this.postService.getAll().subscribe((data: Post[]) => this.news = Post.listFromData(data));
    console.log(this.news);
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe();
    this.news = this.news.filter( data => data !== this.selectedPost);
  }

  setSelectedPostId(post : Post){
    this.selectedPost = post;
}

  showFrame(file: File) {

  }


}
