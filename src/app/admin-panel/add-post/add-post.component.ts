import { Component, OnInit } from '@angular/core';
import {FileDTO} from "../../../models/FileDTO";
import {TreeNode} from "../../../models/TreeNode";
import {Category} from "../../../models/Category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {MessageService} from "primeng/api";
import {PostService} from "../../../services/post.service";
import {FileDBService} from "../../../services/fileDB.service";
import {PostTO} from "../../../models/PostTO";

enum Prioryty {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'
}

interface PriorytyInterface {
  name: string;
  code: string;
  value: Prioryty;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postText: string = 'Treść';

  postTitle: string = 'Tytuł';

  priorytyList: PriorytyInterface[];

  selectedPrioryty: PriorytyInterface;


  treeNode: TreeNode = TreeNode.prototype;

  categoryTree: Category = Category.prototype;

  allCategories: Category [] = [];

  selectedCategoryForPost: TreeNode = null;

  selectedCategoryForCategory: TreeNode = null;

  uploadFiles: File[] = [];

  isCategoriesEdit: boolean;


  constructor(private categoryServ: CategoryService, private message: MessageService, private postService: PostService, private fileService: FileDBService) {

    this.downloadCategoryTree();

    this.isCategoriesEdit = false;

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

