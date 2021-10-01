import { Component, OnInit } from '@angular/core';
import {FileDTO} from "../../models/FileDTO";
import {DataService} from "../../services/data.service";
import {FileDBService} from "../../services/fileDB.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  file: FileDTO;

  constructor(private dataService : DataService , private fileService: FileDBService) { }

  ngOnInit(): void {
    this.fileService.getChartFile().subscribe( data => this.dataService.changeCurrentChartFile(data))


    this.dataService.currentChartFile.subscribe( data => this.file = data);

  }

  log(){
    console.log(this.file);
  }


}
