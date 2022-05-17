import { Notifiable } from "utils/notifications";

export abstract class Validator extends Notifiable {
    public constructor() {
        super();
    }

    abstract Validate(): void;
}
