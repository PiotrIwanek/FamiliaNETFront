import {CategoryService} from './../../services/category.service';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {Post} from './../../models/Post.model';
import {Category} from 'src/models/Category';
import {MenuItem} from 'src/models/MenuItem';

import {DataService} from 'src/services/data.service';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: []
})
export class NavbarComponent implements OnInit {


  post: Post;


  logInDialog: boolean;
  authorized = false;
  passwordValue: string;
  usernameValue: string;
  items: MenuItem[] = [];
  title: string;
  postsByCategory: Post [] = [];
  router: Router;

  text: string;
  newsTitle: string;
  categoryTree: Category;
  menuItemTree: MenuItem;
  date = new Date();

  constructor(private messageService: MessageService, private catService: CategoryService, private dataService: DataService , private postService: PostService) {

    this.downloadMenuItemTree();

  }

  ngOnInit(): void {

  }


  downloadMenuItemTree(): void {

    this.catService.getAPICategoryTree().subscribe(
      (data: Category) => {
        this.categoryTree = new Category(data);
      },
      (error) => console.log(error),
      () => {
        this.menuItemTree = (this.categoryTree.toMenuItem((event: any) => { this.changeCurrentTitle(event.item.label) ;
                                                                                      this.changePostByCategory(event.item.categoryId); }));
        this.items = this.items.concat(this.menuItemTree.items);
      }
    );


  }

  changeCurrentTitle(title: string) {
    this.dataService.changeCurrentTitle(title);
  }

  changePostByCategory (categoryId : number){
    this.postService.getByCategory(categoryId).subscribe( (data :Post[]) => this.postsByCategory = Post.listFromData(data) ,
                    error => console.log(error),
      () => this.dataService.changePosts(this.postsByCategory));
    console.log(this.postsByCategory);
}

  logIn(): void {
    if (this.passwordValue == 'test' || this.usernameValue == 'test') {
      this.authorized = true;
      this.logInDialog = false;
    } else {
      this.messageService.add({severity: 'error', summary: '!!!', detail: 'Nieprawidłowy login lub hasło', life: 1750});
      this.logInDialog = false;
    }
  }

  authorize(): boolean {
    if (this.authorized === true) {
      return true;
    } else {
      return false;
    }
  }


}

