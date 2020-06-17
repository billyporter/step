import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    messages: string[] = [];
    messageGross = 0;

    log(msg: string) {
        this.messageGross += 1;
        this.messages.push(
            `Message Gross: ${this.messageGross} Mesage: ${msg}`
        );
    }

    clear() {
        this.messages = [];
    }
}
