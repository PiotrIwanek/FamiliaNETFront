import {Component, OnInit} from '@angular/core';
import {TreeNode} from "../../../models/TreeNode";
import {Category} from "../../../models/Category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {MessageService} from "primeng/api";
import {PostService} from "../../../services/post.service";
import {FileDBService} from "../../../services/fileDB.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  treeNode: TreeNode = TreeNode.prototype;

  categoryTree: Category = Category.prototype;

  allCategories: Category [] = [];

  selectedCategoryForPost: TreeNode = null;

  selectedCategoryForCategory: TreeNode = null;

  uploadFiles: File[] = [];


  public postTitle: string = 'Tytuł';

  postText: string = 'Treść';

  categoryForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  constructor(private categoryServ: CategoryService, private message: MessageService, private postService: PostService, private fileService: FileDBService) {

    this.downloadCategoryTree();

  }


  ngOnInit(): void {
  }

  downloadCategoryTree(): void {

    this.categoryServ.getAPICategoryTree().subscribe(
      (data: Category) => {
        this.categoryTree = new Category(data);
      },
      (error) => console.log(error),
      () => {
        this.treeNode = (this.categoryTree.toNodeTree());
      });

  }


  addCategory(): void {
    try {
      let parent = new Category();
      if (this.selectedCategoryForCategory === null) {
        this.categoryTree.children.length > 12 ?
          this.message.add({
            severity: 'warn',
            summary: 'Przekroczono ilość MenuItem',
            detail: 'Ponad 12 elementów menu',
            life: 1750
          })
          : parent = this.categoryTree;
      } else {
        parent = this.selectedCategoryForCategory.category;
      }

      this.categoryServ.createCategory(this.categoryForm.get('name').value, parent).subscribe(
        function (data) {
          parent.add(new Category(data));
        },
        (error) => console.log(error),
        () => this.treeNode = this.categoryTree.toNodeTree())
      ;
      this.message.add({
        severity: 'success',
        summary: 'Dodano folder',
        detail: this.categoryForm.get('name').value,
        life: 1750
      });
      this.categoryForm.reset();
    } catch {
      console.error();
      this.message.add({severity: 'error', summary: 'Nieprawidłowe dane', life: 1750});
    }
    this.selectedCategoryForCategory = null;
  }

  deleteCategory() {
    if (this.selectedCategoryForCategory.children.length === 0) {

      let category = this.selectedCategoryForCategory.category;
      let parent = this.treeNode.findElementById(category.parentId);
      if (parent == null) {
        this.treeNode.children = this.treeNode.children.filter(data => data !== this.selectedCategoryForCategory);
      } else {
        parent.children = parent.children.filter(data => data !== this.selectedCategoryForCategory);
      }
      this.categoryServ.delete(this.selectedCategoryForCategory.id).subscribe();
      this.message.add({
        severity: 'warn',
        summary: 'Usunięto folder',
        detail: this.selectedCategoryForCategory.category.getName(),
        life: 1750
      });
    } else {
      this.message.add({
        severity: 'error',
        summary: 'Folder zawiera inne ',
        detail: this.selectedCategoryForCategory.category.getName(),
        life: 1750
      });
    }
    this.selectedCategoryForCategory = null;
  }


  nodeSelect(event) {
    this.message.add({severity: 'info', summary: 'Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    this.message.add({severity: 'info', summary: 'Unselected', detail: event.node.label});
  }
}
