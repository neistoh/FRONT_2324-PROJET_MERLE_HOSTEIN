export class UserModel {
    nickname: string;
    mail: string;
    name: string;
    firstName: string;
    birthdate: Date;
    avatar: string;
    status: string;

    constructor(nickname: string,mail:string,name: string,firstName:string,birthdate:Date,avatar:string,status: string){
        this.nickname = nickname;
        this.mail = mail;
        this.name = name;
        this.firstName = firstName;
        this.birthdate = birthdate;
        this.avatar = avatar;
        this.status = status;
    }
}