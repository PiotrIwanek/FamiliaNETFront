import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Post } from './../../models/Post.model';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: []
})
export class NavbarComponent implements OnInit, OnChanges {



  post: Post;


  logInDialog: boolean;
  authorized = true;
  passwordValue: string;
  usernameValue: string;
  items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'news' },
    { label: 'Admin', icon: 'pi pi-fw pi-cog', routerLink: 'admin', visible: this.authorized , tabindex: '5'}
    ]


  text: string;
  newsTitle: string;
  date = new Date() ;

  constructor(private messageService: MessageService, private catService: CategoryService) {
  }

  ngOnInit(): void {


  this.logInDialog = false;

  this.items.push.apply(this.items , this.catService.tree.toMenuItem());
  console.log(this.items);
}

  ngOnChanges(): void {



}

logIn(): void {
  if (this.passwordValue == 'test' || this.usernameValue == 'test') {
    this.authorized = true ;
    this.logInDialog = false;
  } else {
    this.messageService.add({severity:'error', summary:'!!!', detail:'Nieprawidłowy login lub hasło', life: 1750});
    this.logInDialog = false ;
  }
}

authorize(): boolean{
  if(this.authorized === true){
      return true;
    }else {
    return false
  }
}

refresh(){
  this.ngOnInit();
}
}

