import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../models/MenuItem";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/Category";
import {Post} from "../../models/Post.model";
import {DataService} from "../../services/data.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-acreditation',
  templateUrl: './acreditation.component.html',
  styleUrls: ['./acreditation.component.css']
})
export class AcreditationComponent implements OnInit {


  items: MenuItem [] = [];
  categoryTree: Category;
  postsByCategory: Post [] = [];
  menuItemTree: MenuItem;


  constructor(private catService: CategoryService, private dataService: DataService,
              private postService: PostService) {

  }

  ngOnInit(): void {
    this.downloadMenuItemTree();
  }

  downloadMenuItemTree(): void {

    this.catService.getAPICategoryTree().subscribe(
      (data: Category) => {
        this.categoryTree = new Category(data);
      },
      (error) => console.log(error),
      () => {
        this.menuItemTree = (this.categoryTree.toMenuItem((event: any) => {
          this.changeCurrentTitle(event.item.label);
          this.changePostByCategory(event.item.categoryId);
        }));
        this.items = this.items.concat(this.menuItemTree.items);
      }
    );
  }

  changeCurrentTitle(title: string) {
    this.dataService.changeCurrentTitle(title);
  }

  changePostByCategory(categoryId: number) {
    this.postService.getByCategory(categoryId).subscribe((data: Post[]) => this.postsByCategory = data,
      error => console.log(error),
      () => this.dataService.changePosts(this.postsByCategory));
  }

}
