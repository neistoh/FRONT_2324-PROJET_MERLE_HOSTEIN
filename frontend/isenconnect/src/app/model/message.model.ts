export class MessageModel {
    _id: number;
    text: string;
    chat: number;
    nickname: string;
    sentAt: Date
    
    constructor(_id:number,text:string,chat:number,nickname:string,sentAt:Date){
        this._id = _id;
        this.text = text;
        this.chat = chat;
        this.nickname = nickname;
        this.sentAt = sentAt
    }
}