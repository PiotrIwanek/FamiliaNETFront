import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  webSrc = 'assets/images/Webz_szary.png';
  znanySrc  = 'assets/images/Znany%20lekarz_szary.png';
  trelloSrc = 'assets/images/Trelo_szary.png'


  constructor(private router:  Router) { }

  ngOnInit(): void {
  }

  goToLink(url: string){
    window.open(url ,"_blank")

  }

}
