import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

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
      {label: 'Posty', icon: 'pi pi-desktop', routerLink: 'addPost'},
      {label: 'Użytkownicy', icon: 'pi pi-user', routerLink: 'addUser'},
      {label: 'Grafik', icon: 'pi pi-calendar', routerLink: 'addChartFile'},
      {label: 'Placówki', icon: 'pi pi-globe', routerLink: 'addUnit'},
      {label: 'Wydarzenia', icon: 'pi pi-calendar-plus', routerLink: 'addEvent'}
    ]

  }

}
