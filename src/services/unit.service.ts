import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Unit} from "../models/Unit";

@Injectable({
  providedIn: 'root'
})

export class UnitService {

  URL = environment.URL + 'unit';

  // URL =  "http://10.10.8.253:8090/" + 'unit';


  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Unit[]>(this.URL);
  }

  addUnit(unit: Unit) {
    return this.http.post<Unit>(this.URL, unit);
  }

  updateUnit(unit: Unit) {
    return this.http.post<Unit>(this.URL, unit);
  }

  public delete(id: string) {
    return this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }
}
