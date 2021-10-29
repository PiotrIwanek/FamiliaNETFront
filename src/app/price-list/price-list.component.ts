import {Component, OnInit} from '@angular/core';
import {PriceRecord} from "../../models/PriceRecord";
import {DataService} from "../../services/data.service";
import {MessageService} from "primeng/api";
import {PriceRecordService} from "../../services/priceRecord.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  authorized: boolean;
  priceRecords: PriceRecord[];
  selectedRecords: PriceRecord[];
  addRecordDialog: boolean;
  editRecordDialog: boolean;
  currentEditingRecord: PriceRecord = PriceRecord.prototype;
  addForm: FormGroup;
  name: FormControl;
  description: FormControl;
  price: FormControl;

  constructor(private dataService: DataService, private messageService: MessageService, private priceRecordService: PriceRecordService) {
  }

  ngOnInit(): void {

    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);

    this.addRecordDialog = false;
    this.editRecordDialog = false;

    this.priceRecordService.getAll().subscribe(data => this.priceRecords = data);

    this.name = new FormControl("" , [Validators.required ])
    this.description = new FormControl("" , [Validators.required ])
    this.price = new FormControl(0 , [Validators.required ])
    this.addForm = new FormGroup(
      {
        name: this.name,
        description: this.description,
        price: this.price
      }
    );
  }

  openNew() {
    this.addRecordDialog = true
  }

  addRecord(name: string, description: string, price: number) {

    if (this.addForm.valid) {
      try {
        this.priceRecordService.add(new PriceRecord(name, description, price)).subscribe(data => this.priceRecords.push(data))
        this.messageService.add({
          severity: "success",
          summary: "Dodano pozycję",
          life: 3000
        })
        this.addForm.reset();
        this.addRecordDialog = false;
      } catch (e) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Problem z dodaniem pozycji',
          detail: e,
          life: 3000
        })
      }
    } else {
        console.log("INVALID")
    }
  }

  deleteSelectedRecords() {
    this.selectedRecords.forEach(data => this.priceRecordService.delete(data.id).subscribe());
    this.selectedRecords.forEach(data => this.priceRecords = this.priceRecords.filter(data1 => data1 !== data));
  }

  openEditRecord(record) {
    this.currentEditingRecord = record;
    this.editRecordDialog = true;
  }

  editRecord(name
               :
               string, description
               :
               string, price
               :
               number
  ) {
    /* var record : PriceRecord;
      record = this.priceRecords.filter( record =>  record.id === this.currentEditingRecord.id)[0];
     record.name = name;
     record.description = description;
     record.price = price;*/

  }

  deleteRecord(record) {
    this.priceRecordService.delete(record.id).subscribe();
    this.priceRecords = this.priceRecords.filter(data => data !== record);
  }

}
