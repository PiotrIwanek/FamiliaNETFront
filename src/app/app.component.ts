import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/services/category.service';
import {DataService} from "../services/data.service";
import {MessageService} from "primeng/api";
import {LoginService} from "../services/login.service";
import {User} from "../models/User";
import {map} from "rxjs/operators";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FamiliaNET';
  logIn: boolean;
  authorized = false;
  passwordValue: string;
  usernameValue: string;
  logInDialog: boolean;
  user: User = User.prototype;
  date = Date.now();


  constructor(private categoryService: CategoryService, private dataService: DataService, private messageService: MessageService,
              private loginService: LoginService, private userService: UserService) {

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
    this.dataService.currentLogInDialog.subscribe( data => this.logInDialog = data);
    this.dataService.currentLogIn.subscribe( data => this.logIn = data);
    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);
  }


  public log() {

    this.loginService.logIn(this.usernameValue, this.passwordValue).pipe(map(function (data: User) {
      return User.fromData(data)
    }))
    .subscribe(data => this.user = User.fromData(data),
      error => this.messageService.add({
        severity: 'error',
        summary: '!!!',
        detail: 'Nieprawidłowy login lub hasło',
        life: 1750
      }),
      () => this.authenticate())

  }

  public authenticate() {
    if (this.user.role === 'ADMIN') {
      localStorage.setItem('logOn' , 'true');
      localStorage.setItem('authorized', 'true');
      localStorage.setItem('userID', this.user.id.toString())
      localStorage.setItem('login', this.user.name);
      this.dataService.changeCurrentLogIn(true);
      this.dataService.changeAuthorized(true);
      this.dataService.changeCurrentLogInDialog(false);
    } else if (this.user.role === 'USER') {
      localStorage.setItem('logOn' , 'true');
      localStorage.setItem('authorized', 'false');
      localStorage.setItem('userID', this.user.id.toString())
      localStorage.setItem('login', this.user.name);
      this.dataService.changeCurrentLogIn(true);
      this.dataService.changeAuthorized(false);
      this.dataService.changeCurrentLogInDialog(false);
    } else {
      localStorage.setItem('logOn' , 'false');
      this.dataService.changeCurrentLogIn(false);
      this.dataService.changeAuthorized(false);
      this.dataService.changeCurrentLogInDialog(true);

    }
  }


  public logOut() {
    localStorage.clear();
    this.dataService.changeAuthorized(false);
    this.logIn = false;

  }

}
