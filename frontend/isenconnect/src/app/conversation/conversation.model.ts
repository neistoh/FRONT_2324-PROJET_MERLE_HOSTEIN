export class ConversationModel {
    name: string;
    image: string;
    _id: string;
    user1: string;
    user2: string;

    constructor(name: string,image:string, _id: string, user1: string, user2: string){
        this.name = name;
        this.image = image;
        this._id = _id;
        this.user1 = user1;
        this.user2 = user2;
    }
}