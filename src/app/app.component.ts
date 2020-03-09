import { Component } from '@angular/core';
import {MailService,Mail} from '../app/mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppingList';
  item : string  ;
  price : number;
  itemArray = [];
  priceArray = [];
  priceTotal:number ;
  mailInput:string;
  items: Mail ={
    mail: '',
    item: this.itemArray,
    priceTotal: 0
  }
  constructor(private mailService: MailService){}
  addItem(){
    if(this.price === undefined ){
      this.price = 0;
    }
    let itemsJson = new Object({"item":`${this.item}`,"price":`${this.price}`});

    this.itemArray.push(itemsJson)
    this.priceArray.push(parseFloat(itemsJson['price']))
    this.calculPriceTotal();
  }
  calculPriceTotal(){
    this.items.priceTotal = this.priceArray.reduce((a,b)=>{
      return a + b
    })
  }
  deleteItem(index:number){
    this.itemArray.splice(index,1);
    this.priceArray.splice(index,1);
    this.calculPriceTotal();
  }
  sendMail(){
    
    this.items.mail = this.mailInput;
    this.mailService.mail(this.items).subscribe((data)=>{
      console.log(data)
    })
  }
}
