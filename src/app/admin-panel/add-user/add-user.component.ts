import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  users: User[];
  addUserFormVisible: boolean;
  addUserForm;
  nameAddUserForm;
  surenameAddUserForm;
  loginAddUserForm;
  passwordAddUserForm;
  roleAddUserForm;
  isUserEdited: boolean;
  editedUser: User = User.prototype;

  // editUserForm;

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => this.users = data);

    this.nameAddUserForm = new FormControl();
    this.surenameAddUserForm = new FormControl();
    this.loginAddUserForm = new FormControl();
    this.passwordAddUserForm = new FormControl();
    this.roleAddUserForm = new FormControl(false);

    this.isUserEdited = false;


    this.addUserForm = new FormGroup({
      name: this.nameAddUserForm,
      surename: this.surenameAddUserForm,
      login: this.loginAddUserForm,
      password: this.passwordAddUserForm,
      role: this.roleAddUserForm
    })


  }

  addUser() {
    let role: 'ADMIN' | 'USER';
    if (this.addUserForm.valid) {
      if (this.roleAddUserForm.value) {
        role = "ADMIN";
      } else {
        role = 'USER'
      }
      let user = new User(null, this.nameAddUserForm.value, this.surenameAddUserForm.value, this.loginAddUserForm.value, this.passwordAddUserForm.value, role)

      this.userService.createUser(user).subscribe(data => this.users.push(data));
      this.addUserFormVisible = false;
      this.addUserForm.reset();

    } else {
      this.messageService.add({severity: 'error', summary: "Niepoprawnie wypełniony formularz"});

    }
  }

  openEditUser(user: User) {
    this.addUserFormVisible = true;
    this.isUserEdited = true;

    this.editedUser = user;

    this.nameAddUserForm.setValue(this.editedUser.name);
    this.surenameAddUserForm.setValue(this.editedUser.surename);
    this.loginAddUserForm.setValue(this.editedUser.login);
    this.passwordAddUserForm.setValue(this.editedUser.password);
    if (this.editedUser.role === 'ADMIN') {
      this.roleAddUserForm.setValue(true);
    } else {
      this.roleAddUserForm.setValue(false);
    }
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe();
    this.users = this.users.filter(data => data !== user);
  }

  editUser() {

    let role: 'ADMIN' | 'USER';
    if (this.addUserForm.valid) {
      if (this.roleAddUserForm.value) {
        role = "ADMIN";
      } else {
        role = 'USER'
      }
      let user = new User(this.editedUser.id, this.nameAddUserForm.value, this.surenameAddUserForm.value, this.loginAddUserForm.value, this.passwordAddUserForm.value, role)
      this.userService.update(user).subscribe(data => {
        this.users.find(data => data.id === this.editedUser.id).name = data.name;
        this.users.find(data => data.id === this.editedUser.id).surename = data.surename;
        this.users.find(data => data.id === this.editedUser.id).login = data.login;
        this.users.find(data => data.id === this.editedUser.id).password = data.password;
        this.users.find(data => data.id === this.editedUser.id).role = data.role;
      });

      this.addUserFormVisible = false;
      this.isUserEdited = false;
      this.addUserForm.reset();

    } else {
      this.messageService.add({severity: 'error', summary: "Niepoprawnie wypełniony formularz"});

    }

  }

  clearForm() {
    this.addUserForm.reset();
  }

  showPass() {
    var x;
    x = document.getElementsByName("password");
    x.forEach(data => {
        if (data.type === 'password') {
          data.type = 'text'
        } else {
          data.type = 'password'
        }
      }
    )
  }
}
