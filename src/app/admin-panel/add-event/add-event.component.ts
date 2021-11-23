import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/Event";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  events: Event[];
  eventForm: FormGroup;
  eventFormVisible: boolean;

  titleEventForm: FormControl;
  mainEventForm: FormControl;
  startEventForm: FormControl;
  recipientEventForm: FormControl;
  backgroundColorEventForm: FormControl;


  constructor(private eventService: EventService, private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.eventService.getAll().subscribe(data => this.events = data);

    this.eventFormVisible = false;
    this.titleEventForm = new FormControl('', [Validators.required]);
    this.mainEventForm = new FormControl('');
    this.startEventForm = new FormControl(new Date(), [Validators.required]);
    this.recipientEventForm = new FormControl('');
    this.backgroundColorEventForm = new FormControl("#1111f0");



    this.eventForm = new FormGroup({
      title: this.titleEventForm,
      main: this.mainEventForm,
      start: this.startEventForm,
      recipient: this.recipientEventForm,
      backgroundColor: this.backgroundColorEventForm
    });
  }

  add() {

    if (this.eventForm.valid) {
      this.eventService.add(new Event(0, this.titleEventForm.value, this.startEventForm.value, this.mainEventForm.value, this.recipientEventForm.value, this.backgroundColorEventForm.value)
      ).subscribe(
        data => {
          console.log(data)
          this.events.push(data);
          this.messageService.add({severity: 'success', summary: ' Poprawnie dodano wydarzenie'})
        }
      )
    } else {
      this.messageService.add({severity: 'danger', summary: 'Niepoprawnie wypełniony formularz'})
    }
  }

  delete(event: Event){
    this.eventService.delete(event).subscribe();
    this.events = this.events.filter( data => data !== event);
  }

  clear(){
    this.eventFormVisible = false
    this.eventForm.reset();
  }

}
