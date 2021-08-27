import {Component, OnInit} from '@angular/core';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';


import {TreeNode} from './../../models/TreeNode';
import {Category} from 'src/models/Category';
import {CategoryService} from './../../services/category.service';
import {PostService} from './../../services/post.service';
import {FileDBService} from "../../services/fileDB.service";
import {FileDTO} from "../../models/FileDTO";
import {Post} from "../../models/Post.model";
import {FileTO} from "../../models/FileTO";
import {PostTO} from "../../models/PostTO";
import {error} from "protractor";

enum Prioryty {
  LOW = 'LOW', MEDIUM ='MEDIUM', HIGH = 'HIGH'
}

interface PriorytyInterface{
  name : string;
  code : string;
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

  uploadFiles: File [] = [];

  filesToSend: FileDTO [] = [];

  selectedPrioryty: PriorytyInterface;

  priorytyList : PriorytyInterface[];



  public postTitle: string = 'Tytuł';

  postText: string = 'Treść';

  categoryForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  constructor(private categoryServ: CategoryService, private message: MessageService, private postService: PostService , private fileService : FileDBService) {

    this.downloadCategoryTree();

    this.priorytyList = [
      { name : 'Niski' , code : 'LOW', value: Prioryty.LOW},
      { name : 'Średni' , code : 'MEDIUM', value: Prioryty.MEDIUM},
      { name : 'Wysoki' , code : 'HIGH', value: Prioryty.HIGH}
    ]

  }


  ngOnInit(): void {
  }

  public test() {
    console.log(this.selectedPrioryty.value);
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
      var parent = new Category();
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

  addPost() {
   try{

     let files : FileTO[] = []
    this.filesToSend.forEach( data => files.push(new FileTO(data.id)))
    let post = new PostTO(this.postTitle, this.postText, new Date() ,this.selectedCategoryForPost.category, this.selectedPrioryty.value, files  ,[])
    console.log(post);


     this.postService.addPost(post).subscribe();

    this.message.add({
       severity: 'success',
       summary: 'Dodano post',
       detail: this.postTitle + " Został dodany",
       life: 1750
     });

     this.postTitle = '';
     this.postText = '';
     this.selectedCategoryForPost = null;
     this.selectedPrioryty = null;

  } catch ( exeption) {

     this.message.add({
       severity: 'warn',
       summary: 'Nie udało się stworzyć postu , sprawdz wypełnione dane',
       detail:  exeption ,
       life: 1750
     });

   }
  }

  nodeSelect(event) {
    this.message.add({severity: 'info', summary: 'Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    this.message.add({severity: 'info', summary: 'Unselected', detail: event.node.label});
    console.log(this.categoryTree);
  }

  // Do poprawki !!
  myUploader(event) {
    this.uploadFiles = event.files;
    event.files.forEach(data => this.fileService.addFile(data).subscribe(
      (data: FileDTO) => this.filesToSend.push(data)))
  }

  removeFileToSend(file) {
    var index = this.filesToSend.indexOf(file, 0);
    this.filesToSend.splice(index, index);
    this.fileService.delete(file.id).subscribe();
  }
}
