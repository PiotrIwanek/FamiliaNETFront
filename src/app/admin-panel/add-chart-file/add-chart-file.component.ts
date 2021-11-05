import {Component, OnInit} from '@angular/core';
import {FileUpload} from "primeng/fileupload";
import {FileDBService} from "../../../services/fileDB.service";
import {DataService} from "../../../services/data.service";
import {FileDTO} from "../../../models/FileDTO";

@Component({
  selector: 'app-add-chart-file',
  templateUrl: './add-chart-file.component.html',
  styleUrls: ['./add-chart-file.component.css']
})
export class AddChartFileComponent implements OnInit {

  chartFile: FileDTO;


  constructor(private fileService: FileDBService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.fileService.getChartFile().subscribe(data => this.dataService.changeCurrentChartFile(data))
    this.dataService.currentChartFile.subscribe(data => this.chartFile = data);
  }


  uploadFile(event, uploader: FileUpload) {
    event.files.forEach(data => this.fileService.addChartFile(data)
    .subscribe(response => {
      this.chartFile = response;
      this.dataService.changeCurrentChartFile(response)
    }));
    uploader.clear();
  }

}
