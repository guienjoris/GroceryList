import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Mail{
  mail:string
  item:string[]
  priceTotal:number;
}
@Injectable({
  providedIn: 'root'
})
export class MailService {
  url:string = "http://localhost:3000/mailer"
  constructor(private http: HttpClient) { }
  mail(mail:Mail){
    const config = { headers: new HttpHeaders().set('Content-Type','application/json')};
    return this.http.post(this.url,mail,config)
  }
}
