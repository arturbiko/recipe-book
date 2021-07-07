import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "./item.model";

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  endpoint = 'http://127.0.0.1:4201/recipe';

  constructor(
    private http: HttpClient
  ) {
  }

  fetchByQuery(query: string): Observable<Item[]> {
    const endpoint = `${this.endpoint}/find/${query}`
    return this.http.get<Item[]>(endpoint);
  }

  fetchAll(): Observable<Item[]> {
    const endpoint = `${this.endpoint}/all`;
    return this.http.get<Item[]>(endpoint);
  }
}
