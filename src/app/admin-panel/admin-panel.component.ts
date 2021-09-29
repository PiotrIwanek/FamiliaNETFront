import {Component, OnInit} from '@angular/core';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuItem, MessageService} from 'primeng/api';
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

  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {

    this.items = [
      {label: 'Posty' , icon: 'pi pi-desktop' , routerLink: 'addPost'},
      {label: 'Użytkownicy' , icon: 'pi pi-user' , routerLink: 'addUser'},
      {label: 'Grafik', icon: 'pi pi-calendar'  , routerLink: 'addChartFile'}
    ]

  }

}
