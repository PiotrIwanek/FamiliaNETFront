import { OnInit, Component } from '@angular/core';


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { Composit } from 'src/models/Composit';
import { TreeNode } from './../../models/TreeNode';
import { Category } from 'src/models/Category';
import { CategoryService } from './../../services/category.service';
import { PostService } from './../../services/post.service';





@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

   treeNodes : TreeNode [];

   allCategories: Category [] = [];

   selectedCategory: TreeNode = null;

   selectedFile: TreeNode = null;

   uploadFiles: File [] = [];

   filesToSend: File [] = [];

  public  postTitle: string = 'Tytuł';

   postText: string = 'Treść';

   categoryForm = new FormGroup (
     {  name: new FormControl    ('', [Validators.required , Validators.minLength(3)]),
        parent : new FormControl ('' , [Validators.required ])
   })






  constructor(private categoryServ : CategoryService, private  message: MessageService,  private postService: PostService ) { }

  ngOnInit(): void {

    this.treeNodes = this.categoryServ.tree.toNodeTree();

    this.allCategories = this.categoryServ.getAll();

}

addCategory (){

try {
var category: Composit;
if(this.selectedFile === null ){
  category = this.categoryServ.tree;
}else{
category = this.selectedFile.Category;
}
this.categoryServ.createCategory(this.categoryForm.get('name').value, category);
this.message.add({severity:'success', summary:'Dodano folder', detail: this.categoryForm.get('name').value,  life: 1750})
this.treeNodes = this.categoryServ.tree.toNodeTree();
this.allCategories = this.categoryServ.getAll();
this.categoryForm.reset();
} catch {

  this.message.add({severity:'error', summary:'Nieprawidłowe dane' , life: 1750})
}
this.selectedFile = null;
}

deleteCategory(){

  if(this.selectedFile.children.length === 0 ){
  this.categoryServ.delete(this.selectedFile.Category);
  this.treeNodes = this.categoryServ.tree.toNodeTree();
  this.allCategories = this.categoryServ.getAll();
  this.message.add({severity:'warn', summary:'Usunięto folder' , detail: this.selectedFile.Category.getName() , life: 1750})
   }else{
    this.message.add({severity:'error', summary:'Folder zawiera inne ' , detail: this.selectedFile.Category.getName() , life: 1750})
  }
  this.selectedFile = null;
}

addPost(){
  this.postService.addPost(this.postTitle , this.postText , this.selectedCategory.Category , 'priority' , this.filesToSend);
  console.log(this.postService.getNews());
}

nodeSelect(event) {
  this.message.add({severity: 'info', summary: 'Selected', detail: event.node.label});
}

nodeUnselect(event) {
  this.message.add({severity: 'info', summary: 'Unselected', detail: event.node.label});
}

myUploader(event){
 this.uploadFiles = event.files;
 this.filesToSend.push.apply(this.filesToSend , this.uploadFiles);
 console.log(this.uploadFiles);
 console.log(this.filesToSend);

}
removeFileToSend(file){
  var index = this.filesToSend.indexOf(file, 0);
  this.filesToSend.splice(index , index);
 console.log(file);
 console.log(index);
}

}
