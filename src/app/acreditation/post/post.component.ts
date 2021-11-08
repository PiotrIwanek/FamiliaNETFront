import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/Post.model';
import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/services/category.service';
import {DataService} from 'src/services/data.service';
import {MenuItem, MessageService} from "primeng/api";
import {FileDBService} from "../../../services/fileDB.service";
import {Category} from "../../../models/Category";
import {TreeNode} from "../../../models/TreeNode";
import {FileDTO} from "../../../models/FileDTO";
import {FileUpload} from "primeng/fileupload";


enum Prioryty {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'
}

interface PriorytyInterface {
  name: string;
  code: string;
  value: Prioryty;
}


interface uploadedFiles {

  id: string;
  isUploaded: boolean;

}

@Component({
  selector: 'app-news',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  title: string;

  news: Post[] = [];

  items: MenuItem[];

  selectedPost: Post = Post.prototype;
  // new post( '', '', ' ', new Date(), new Date(), false ,  Category.prototype , 'LOW' ,[] ,[] , []);

  authorized: boolean;
  isFileDelete: boolean;
  isPostEdit: boolean;

  fileIdToDelete: string;
  postIdToDeleteFile: string;

  priorytyList: PriorytyInterface [];
  selectedPrioryty: PriorytyInterface;
  selectedCategoryForPost;
  treeNode: TreeNode = TreeNode.prototype;

  categoryTree: Category = Category.prototype;

  isFileListEdit: boolean;
  fileToUpload: File[];
  listOfPostFiles: Array<any>;

  uploader: FileUpload;


  constructor(private postService: PostService, private catService: CategoryService, private dataService: DataService
    , private fileService: FileDBService, private message: MessageService) {

    this.downloadCategoryTree();

    this.priorytyList = [
      {name: 'Niski', code: 'LOW', value: Prioryty.LOW},
      {name: 'Średni', code: 'MEDIUM', value: Prioryty.MEDIUM},
      {name: 'Wysoki', code: 'HIGH', value: Prioryty.HIGH}
    ]
    this.isFileDelete = false;
    this.isFileListEdit = false;

  }

  ngOnInit(): void {

    this.dataService.currentTitle.subscribe(((data) => this.title = data));
    this.dataService.currentPosts.subscribe((data: Post []) => this.news = data);
    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);

    this.isPostEdit = false;
    this.items = [
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.deletePost(this.selectedPost)},
      {label: 'Edit', icon: ' pi pi-fw pi-pencil', command: () => this.isPostEdit = true}
    ]
  }

  getPost() {
    this.postService.getAll().subscribe((data: Post[]) => this.news = data);
    console.log(this.news);
  }

  deletePost(post: Post) {
    post.fileDBList.forEach(file => this.fileService.delete(file.id).subscribe());
    this.postService.delete(post.id).subscribe();
    this.news = this.news.filter(data => data !== this.selectedPost);
  }

  setSelectedPostId(post: Post) {
    this.selectedPost = post;
    this.listOfPostFiles = this.selectedPost.fileDBList;
  }

  updatePost(files: FileDTO []) {

    return this.postService.updatePost(new Post(this.selectedPost.id, this.selectedPost.name, this.selectedPost.main,
      this.selectedPost.dateTime, this.selectedPost.deadLineDate, this.selectedPost.shouldBeSign, this.selectedPost.category,
      this.selectedPost.priority, this.selectedPost.fileDBList, this.selectedPost.users, this.selectedPost.signs, this.selectedPost.units));
  }


  submitt() {

    if (this.isFileListEdit) {
      let files: FileDTO[] = this.selectedPost.fileDBList;

      // files = files.filter( data  =>  data !== null );
      this.fileToUpload.forEach(file => this.fileService.addFile(file).subscribe(response => files.push(response),
        error => console.log(error),
        () => this.updatePost(files).subscribe(response => console.log(response))));
    } else {
      this.postService.updatePost(this.selectedPost).subscribe(data => console.log(data));
    }
    this.isPostEdit = false;
  }

  nodeSelect(event) {
    this.message.add({severity: 'info', summary: 'Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    this.message.add({severity: 'info', summary: 'Unselected', detail: event.node.label});
  }

  fileUploader(event) {
    this.isFileListEdit = true;

    this.fileToUpload = event.files;

    // this.listOfPostFiles.push(event.file);
    // this.fileToUpload.forEach( file => this.listOfPostFiles.push(file));
  }

  removeFileToSend(file) {
    this.selectedPost.fileDBList = this.selectedPost.fileDBList.filter(files => files !== file);
    console.log(this.selectedPost.fileDBList);
  }

  downloadCategoryTree(): void {
    this.catService.getAPICategoryTree().subscribe(
      (data: Category) => {
        this.categoryTree = new Category(data);
      },
      (error) => console.log(error),
      () => {
        this.treeNode = (this.categoryTree.toNodeTree());
      });
  }

  setPriority() {
    this.selectedPost.priority = this.selectedPrioryty.value;
  }

  preDeletingFile(postId: string, fileId: string) {
    this.isFileDelete = true;
    this.postIdToDeleteFile = postId;
    this.fileIdToDelete = fileId;
  }

  cancelDeletingFile() {
    this.isFileDelete = false;
    this.postIdToDeleteFile = null;
    this.fileIdToDelete = null;
  }

  deleteFile() {
    this.postService.deleteFromPost(this.postIdToDeleteFile, this.fileIdToDelete).subscribe();
    var post = this.news.find(post => post.id === this.postIdToDeleteFile);
    post.fileDBList = post.fileDBList.filter(file => file.id !== this.fileIdToDelete);
    this.isFileDelete = false;
    this.message.add({
      severity: 'warn',
      summary: 'Usunięto plik',
      life: 1750
    });

  }

  uploadFile(event, postId: string, fileUpload) {
    var post = this.news.find(post => post.id === postId);
    event.files.forEach(data => this.fileService.addFile(data)
    .subscribe(response => {
      this.postService.attachToPost(postId, response.id)
      .subscribe();
      post.fileDBList.push(response)
    }))
    fileUpload.clear();
    this.message.add({
      severity: 'success',
      summary: 'Dodano plik',
      detail: "Plik został dodany",
      life: 1750
    })

  }

}
