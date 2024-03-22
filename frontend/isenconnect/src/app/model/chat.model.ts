export class ChatModel {
    _id: number;
    user1: string;
    user2: string;
    lastMessage: Date
    
    constructor(_id:number,user1:string,user2:string,lastMessage:Date){
        this._id = _id;
        this.user1 = user1;
        this.user2 = user2;
        this.lastMessage = lastMessage
    }
}