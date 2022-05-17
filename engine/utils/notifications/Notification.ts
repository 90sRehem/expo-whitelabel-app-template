export class Notification {
    public Property: string;
    public Message: string;
    constructor(property: string, message: string) {
        this.Property = property;
        this.Message = message;
    }
}