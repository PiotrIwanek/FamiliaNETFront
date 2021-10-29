import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post.model";
import {PostService} from "../../services/post.service";
import {TreeNode} from "../../models/TreeNode";
import {Category} from "../../models/Category";
import {FileUpload} from "primeng/fileupload";
import {DataService} from "../../services/data.service";
import {FileDTO} from "../../models/FileDTO";
import {CategoryService} from "../../services/category.service";
import {FileDBService} from "../../services/fileDB.service";
import {MenuItem, MessageService} from "primeng/api";
import {PostTO} from "../../models/PostTO";

enum Prioryty {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'
}

interface PriorytyInterface {
  name: string;
  code: string;
  value: Prioryty;
}



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: Post[];
  postText: string = 'Treść';

  postTitle: string = 'Tytuł';

  selectedPost: Post = Post.prototype;

  items: MenuItem[];

  authorized: boolean;
  isFileDelete: boolean;
  isPostCreated: boolean;
  isPostEdit: boolean;

  selectedPrioryty;
  unityList : any[];
  selectedUnits;
  selectedCategoryForPost;
  treeNode: TreeNode = TreeNode.prototype;

  fileIdToDelete: string;
  postIdToDeleteFile:string;

  categoryTree: Category = Category.prototype;

  isFileListEdit: boolean;
  fileToUpload : File[];
  listOfPostFiles : Array<any>;

  uploader : FileUpload;

  uploadFiles: File[] = [];


  constructor(private postService: PostService, private catService: CategoryService, private dataService: DataService
    , private fileService: FileDBService, private message: MessageService) {
  }

  ngOnInit(): void {

    this.isPostCreated = true;
    this.isPostEdit = false;
    this.isPostCreated = false;

    this.postService.getNews().subscribe(data => this.news = data);
    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);

    this.items = [
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.deletePost(this.selectedPost)},
      {label: 'Edit', icon: ' pi pi-fw pi-pencil', command: () => this.isPostEdit = true}
    ]
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
  openCreationDialog(){
    this.isPostCreated = true;
    console.log(true);
  }

  updatePost(files : FileDTO [] ){

    return this.postService.updatePost(new Post(this.selectedPost.id, this.selectedPost.name, this.selectedPost.main,
      this.selectedPost.dateTime, this.selectedPost.deadLineDate  , this.selectedPost.shouldBeSign , this.selectedPost.category,
      this.selectedPost.priority, this.selectedPost.fileDBList , this.selectedPost.users , this.selectedPost.signs , this.selectedPost.units));
  }


  submitt() {

    if (this.isFileListEdit) {
      let files: FileDTO[] = this.selectedPost.fileDBList;

      // files = files.filter( data  =>  data !== null );
      this.fileToUpload.forEach(file => this.fileService.addFile(file).subscribe(response => files.push(response),
        error => console.log(error),
        () => this.updatePost(files).subscribe( response => console.log(response))));
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
  //
  // setPriority() {
  //   this.selectedPost.priority = this.selectedPrioryty.value;
  // }

  preDeletingFile(postId : string , fileId : string){
    this.isFileDelete = true;
    this.postIdToDeleteFile = postId;
    this.fileIdToDelete = fileId;
  }

  cancelDeletingFile(){
    this.isFileDelete = false;
    this.postIdToDeleteFile = null;
    this.fileIdToDelete = null;
  }

  deleteFile(){
    this.postService.deleteFromPost(this.postIdToDeleteFile , this.fileIdToDelete).subscribe();
    var post  = this.news.find( post => post.id === this.postIdToDeleteFile);
    post.fileDBList = post.fileDBList.filter( file => file.id !== this.fileIdToDelete);
    this.isFileDelete = false;
    this.message.add({
      severity: 'warn',
      summary: 'Usunięto plik',
      life: 1750
    });

  }

  uploadFile(event , postId: string , fileUpload){
    var post = this.news.find( post => post.id === postId);
    event.files.forEach( data => this.fileService.addFile(data)
    .subscribe( response =>{
      this.postService.attachToPost(postId , response.id)
      .subscribe(); post.fileDBList.push(response)}))
    fileUpload.clear();
    this.message.add({
      severity: 'success',
      summary: 'Dodano plik',
      detail: "Plik został dodany",
      life: 1750
    })

  }

  sendPost() {
    try {
      if (this.selectedPrioryty === undefined) {
        this.selectedPrioryty = {
          name: 'Niski',
          code: 'LOW',
          value: Prioryty.LOW
        }
      }
      if (this.uploadFiles.length !== 0) {
        let postId : string;

        console.log(this.uploadFiles);
        this.postService.addNews(new PostTO(this.postTitle, this.postText, new Date(), new Date(),
          false, null , "MEDIUM",
          [], [], []))
        .subscribe(response => {this.attachFilesToPost(response.id);
          this.clearDataToPost();
          this.news.push(response);
        this.isPostCreated = false;} )

      } else {
        console.log(this.uploadFiles);
        this.postService.addNews(new PostTO(this.postTitle, this.postText, new Date(), new Date(),
          false, null, "MEDIUM" ,
          [], [], [])).subscribe( response => {this.news.push(response) ; this.isPostCreated = false;});

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

  dscSort(){
   this.news = this.news.sort( (a,b) => { return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()})
  }
  ascSort(){
   this.news = this.news.sort( (b,a) => { return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()})
  }




  attachFilesToPost(postId: string) {

    this.uploadFiles.forEach(data => this.fileService.addFile(data)
    .subscribe(response => this.postService.attachToPost(postId, response.id)
    .subscribe(response => console.log(response))));
  }


  clearDataToPost() {
    this.postTitle = "Tytuł";
    this.postText = "Tekst";
    this.uploadFiles = [];
    this.selectedCategoryForPost = null;
    this.selectedPrioryty = null;
  }

}
