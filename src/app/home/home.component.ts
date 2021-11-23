import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post.model";
import {Calendar, CalendarOptions, EventApi} from '@fullcalendar/angular'
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  webSrc = 'assets/images/Webz_szary.png';
  znanySrc = 'assets/images/Znany%20lekarz_szary.png';
  trelloSrc = 'assets/images/Trelo_szary.png'
  news: Post[];
  events: Event[];

  calendar: Calendar;
  @ViewChild('d1') display1 : Dialog;
  calendarOptions: CalendarOptions
  d1Visible: boolean;
  selectedEvent: any;

  constructor(private router: Router, private postService: PostService, private eventService: EventService) {
  }


  ngOnInit(): void {

    this.d1Visible = false;
    this.postService.getNews().subscribe(data => this.news = data);

    this.eventService.getAll().subscribe(data => this.events = data);


    this.selectedEvent = { extendedProps: {}};

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        headerToolbar: {
          start: 'title',
          center: '',
          end: 'prev,next'
        },
        dayMaxEventRows: true,
        locale: 'pl',
        eventClick: (event) => {
          this.showEventDetails(event.event)
        },
        events: this.events
      };
    }, 2000);

  }

  showEventDetails(event: EventApi) {
    this.selectedEvent = event;
    this.showDisplay(1);
  }


  showDisplay(displayNumber: number) {
    if (1) {
      this.d1Visible = true;
    }
  }

  clear(){
    this.d1Visible = false;
    this.selectedEvent  = null;
  }

  goToLink(url: string) {
    window.open(url, "_blank")

  }

}
