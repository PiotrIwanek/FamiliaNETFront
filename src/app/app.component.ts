import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FamiliaNET';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {

  }

}
