import { Component, OnInit } from '@angular/core';
import {FileDTO} from "../../models/FileDTO";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  file: FileDTO;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  this.dataService.currentChartFile.subscribe( data => this.file = data);

  }

  log(){
    console.log(this.file);
  }


}
