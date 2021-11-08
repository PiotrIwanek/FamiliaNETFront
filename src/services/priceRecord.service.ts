import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PriceRecord} from "../models/PriceRecord";

@Injectable({
  providedIn: 'root'
})
export class PriceRecordService {

  URL = environment.URL + 'priceRecord';

  // URL =  "http://10.10.8.253:8090/" + 'priceRecord';


  constructor(private http: HttpClient) {
  }


  public getAll() {
    return this.http.get<PriceRecord[]>(this.URL);
  }

  public add(priceRecord: PriceRecord) {
    return this.http.post<PriceRecord>(this.URL, priceRecord);
  }

  public delete(id: number) {
    return this.http.delete(this.URL + "/" + encodeURIComponent(id.toString()));
  }

  public update(priceRecord: PriceRecord) {
    return this.http.put(this.URL + '/' + encodeURIComponent(priceRecord.id), priceRecord);
  }

}
