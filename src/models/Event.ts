export class Event {

  id: any;
  title: string;
  start: Date;
  main: string;
  recipient: string;
  backgroundColor: string;


  constructor(id: any, title: string, start: Date, main: string,recipient: string,  backgroundColor: string) {
    this.id = id.toString();
    this.title = title;
    this.start = start;
    this.main = main;
    this.recipient = recipient;
    this.backgroundColor = backgroundColor;
  }



}
