import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { THTA_item } from "./app.item";

@Injectable({ providedIn: 'root' })
export class THTA_program {
    //API URL
    //MAKE SURE THE PORT IS CORRECT BEFORE RUNNING PROGRAM//
    private urlAPI = "http://localhost:5094/list";

    //Contruct a http client to use to request through Angular
    constructor(private http:HttpClient) {}

    //Request List of To-do items from API, using Observable to handle Async requests of HTTP.
    THTA_getAll(): Observable<THTA_item[]> {
        return this.http.get<THTA_item[]>(this.urlAPI);
    }

    //Add item to To-do List of items through HTTP POST request to API, using observable to handle async requests of HTTP.
    THTA_addItem(ItemDesc: string):Observable<THTA_item> {
        return this.http.post<THTA_item>(`${this.urlAPI}?itemDesc=${ItemDesc}`, {});
    }

    //Delete item from To-do list of items through HTTP DELETE request to API, using observable to handle async requests of HTTP.
    THTA_deleteItem(ItemID: string):Observable<void>{
        return this.http.delete<void>(`${this.urlAPI}/${ItemID}`);
    }
}