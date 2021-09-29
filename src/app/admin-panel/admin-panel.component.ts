import {Component, OnInit} from '@angular/core';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {TreeNode} from 'src/models/TreeNode';
import {Category} from 'src/models/Category';
import {CategoryService} from 'src/services/category.service';
import {PostService} from 'src/services/post.service';
import {FileDBService} from "src/services/fileDB.service";
import {PostTO} from "src/models/PostTO";
import {FileDTO} from "src/models/FileDTO";

enum Prioryty {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'
}

interface PriorytyInterface {
  name: string;
  code: string;
  value: Prioryty;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  treeNode: TreeNode = TreeNode.prototype;

  categoryTree: Category = Category.prototype;

  allCategories: Category [] = [];

  selectedCategoryForPost: TreeNode = null;

  selectedCategoryForCategory: TreeNode = null;

  uploadFiles: File[] = [];

  selectedPrioryty: PriorytyInterface;

  priorytyList: PriorytyInterface[];


  public postTitle: string = 'Tytuł';

  postText: string = 'Treść';

  categoryForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  constructor(private categoryServ: CategoryService, private message: MessageService, private postService: PostService, private fileService: FileDBService) {

    this.downloadCategoryTree();

    this.priorytyList = [
      {name: 'Niski', code: 'LOW', value: Prioryty.LOW},
      {name: 'Średni', code: 'MEDIUM', value: Prioryty.MEDIUM},
      {name: 'Wysoki', code: 'HIGH', value: Prioryty.HIGH}
    ]

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


  fileUploader(event) {
    this.uploadFiles = event.files;
  }

  removeFileToSend(file) {
    this.uploadFiles = this.uploadFiles.filter(files => files !== file);
    console.log(this.uploadFiles);
  }


  postPost(files: FileDTO []) {

    if (this.selectedPrioryty === undefined) {
      this.selectedPrioryty = {
        name: 'Niski',
        code: 'LOW',
        value: Prioryty.LOW
      }
    }
    // @ts-ignore
    return this.postService.addPost(new PostTO(this.postTitle, this.postText, new Date(), new Date(), false , this.selectedCategoryForPost.category,
      this.selectedPrioryty.value, files, [] , []));
  }


  clearDataToPost() {
    this.postTitle = "Tytuł";
    this.postText = "Tekst";
    this.uploadFiles = [];
    this.selectedCategoryForPost = null;
    this.selectedPrioryty = null;
  }

  sendPost() {
    try {

      if (this.uploadFiles.length !== 0) {
        let files: FileDTO [] = [];
        console.log(this.uploadFiles);
        this.uploadFiles.forEach(file => this.fileService.addFile(file).subscribe(response => files.push(response),
          error => console.log(error),
          () => this.postPost(files)
          .subscribe(data => {
            console.log(data);
            this.clearDataToPost();
          })));
      } else {
        this.postPost([]).subscribe(() => {
          this.clearDataToPost();
        });
      }
      this.message.add({
        severity: 'success',
        summary: 'Dodano post',
        detail: this.postTitle + " Został dodany",
        life: 1750
      });

    } catch (e) {

      this.message.add({
        severity: 'warn',
        summary: 'Nie udało się stworzyć postu, wybierz kategorie',
        detail: e,
        life: 1750
      });
    }
  }
}
