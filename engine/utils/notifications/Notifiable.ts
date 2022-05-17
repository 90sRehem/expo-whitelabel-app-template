import { Notification } from "./Notification";

export abstract class Notifiable {
    private _notifications: Array<Notification> = new Array<Notification>();
    private _valid = true;
    private _watcher = true;

    public get Valid() {
        return this._valid;
    }

    public set Valid(valid: boolean) {
        this._watcher = this._watcher ? valid : this._watcher;
        this._valid = valid && this._watcher ? valid : this._watcher;
    }

    public get Notifications(): Array<Notification> {
        return this._notifications;
    }

    public set Notifications(notifications: Array<Notification>) {
        this._notifications = notifications;
    }

    public AddNotification(property: string, message: string): void {
        const notification = new Notification(property, message);
        if (!(this._notifications.filter(me => me.Message === message).length > 0))
            this.Notifications.push(notification);
    }
}