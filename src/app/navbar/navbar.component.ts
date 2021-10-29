import {CategoryService} from '../../services/category.service';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {Post} from '../../models/Post.model';
import {Category} from 'src/models/Category';
import {MenuItem} from 'primeng/api';

import {DataService} from 'src/services/data.service';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: []
})
export class NavbarComponent implements OnInit {


  post: Post;

  items: MenuItem[];
  title: string;
  authorized: boolean
  text: string;
  newsTitle: string;
  date = new Date();
  logIn: boolean;
  logInDialog: boolean;
  user: User = User.prototype;
  dropDownItems: MenuItem[];


  constructor(private messageService: MessageService, private catService: CategoryService, private dataService: DataService,
              private postService: PostService, private router: Router , private userService: UserService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem('logOn') === 'true') {
      let userId = localStorage.getItem('userID');
      this.userService.getById(Number(userId)).subscribe(data => this.user = data);
      this.dataService.changeCurrentLogIn(true);
      if(localStorage.getItem('authorized') === 'true') {
        this.dataService.changeAuthorized(true);
      }
    }

    this.dataService.currentLogIn.subscribe( data => this.logIn = data);
    this.dataService.currentLogInDialog.subscribe( data => this.logInDialog = data);
    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);
    this.items = [
      {label: 'Home' , icon: ' pi pi-home' , routerLink: 'home'},
      {label: 'Aktualności' , icon: ' pi pi-bell' , routerLink: 'news'},
      {label: 'Grafik' , icon: ' pi pi-calendar' , routerLink: 'chart'},
      {label: 'Cennik' , icon: ' pi pi-dollar' , routerLink: 'priceList'},
      {label: 'Gabinety' , icon: ' pi pi-key' , routerLink: 'offices'},
      {label: 'Akredytacja' , icon: 'pi pi-book' , routerLink: 'acreditation' }
    ];
    this.dropDownItems = [
      {label: 'Wyloguj' , icon: 'pi pi-logOut' , routerLink: 'home',  command: event => this.logOut()}
    ]
  }

  changeCurrentLogInDialog (logInDialog : boolean){
    this.dataService.changeCurrentLogInDialog(logInDialog);
  }

  changeCurrentLogIn ( logIn: boolean){
    this.dataService.changeCurrentLogIn(logIn);
  }

  log(){
    this.changeCurrentLogInDialog(true);
  }

  logOut(){
    localStorage.clear();
    this.changeCurrentLogIn(false);
    this.dataService.changeAuthorized(false);
    this.router.navigateByUrl('/home');
  }

}

