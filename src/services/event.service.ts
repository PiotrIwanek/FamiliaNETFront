import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  URL = environment.URL + "event"

  constructor(private httpService : HttpClient) {
  }

  public getAll() {
    return this.httpService.get<Event[]>(this.URL);
  }

  public add(event: Event) {
    return this.httpService.post<Event>(this.URL , event);
  }

  public  delete (event: Event){
    return this.httpService.delete<boolean>(this.URL + "/"+ encodeURIComponent(event.id));
  }

  public update ( id: string , event: Event){
    return this.httpService.put<Event>(this.URL + "/" + encodeURIComponent(id) , event);
  }
}
