import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitService} from "../../../services/unit.service";
import {Unit} from "../../../models/Unit";
import {MessageService} from "primeng/api";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  units: Unit[];
  unitAddForm: FormGroup;
  nameUnitAddForm: FormControl;
  addUnitVisible: boolean;
  authorized: boolean;
  isUnitEdited: boolean;
  editedUnit: Unit;

  constructor(private unitService: UnitService, private messageService: MessageService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.addUnitVisible = false;
    this.dataService.currentAuthorized.subscribe(data => this.authorized = data);
    this.unitService.getAll().subscribe(data => this.units = data);
    this.nameUnitAddForm = new FormControl("", [Validators.required]);
    this.unitAddForm = new FormGroup({name: this.nameUnitAddForm});

    this.isUnitEdited = false;

  }

  addUnit() {
    if (this.unitAddForm.valid) {
      this.unitService.addUnit(new Unit(null, this.nameUnitAddForm.value)).subscribe(data => this.units.push(data));
      this.addUnitVisible = false;
      this.unitAddForm.reset();
    } else {
      this.messageService.add({severity: 'warn', summary: "Niepoprawnie wypełniony formularz"});
    }
  }

  openEditUnit(unit: Unit) {
    this.editedUnit = unit;
    this.isUnitEdited = true;
    this.addUnitVisible = true;

    this.nameUnitAddForm.setValue(this.editedUnit.name);
  }

  deleteUnit(unit) {
    try {
      this.unitService.delete(unit.id).subscribe();
      this.units = this.units.filter(data => data !== unit);
    } catch (e) {
      this.messageService.add({severity: 'warn', summary: e});
    }
  }


  editUnit() {
    this.unitService.updateUnit(new Unit(this.editedUnit.id, this.nameUnitAddForm.value)).subscribe(data => {
      let unit = this.units.find(data => data.id === this.editedUnit.id)
      unit.name = data.name
    });
    this.unitAddForm.reset();
    this.isUnitEdited = false;
    this.addUnitVisible = false;

  }

  resetForm() {
    this.unitAddForm.reset();
  }
}
