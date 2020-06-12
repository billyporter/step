import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    messages: string[] = [];
    messageGross: number;

    log(msg: string) {
        if (!this.messageGross) {
            this.messageGross = 1;
        } else {
            this.messageGross += 1;
        }
        this.messages.push(
            `Message Gross: ${this.messageGross} Mesage: ${msg}`
        );
    }

    clear() {
        this.messages = [];
    }
}
