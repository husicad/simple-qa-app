export class Person {
    Id: string;
    Name: string = "Anonymous";
    Surname: string = "";
    Avatar: string = "";

    constructor(private isAnonymous: boolean) {
        if (isAnonymous) {
            this.Name = "Anonymous"
            this.Surname = "";
        }
    }
}  