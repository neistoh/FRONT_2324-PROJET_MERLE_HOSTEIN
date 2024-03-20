export class EventModel {
    _id: number;
    name: string;
    price: number;
    date: Date;
    image: string;
    theme: string;
    
    constructor(_id:number,name:string,price:number,date:Date,image:string,theme:string){
        this._id = _id;
        this.name = name;
        this.price = price;
        this.date = date;
        this.image = image;
        this.theme = theme;
    }
}