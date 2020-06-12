import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
    selector: 'app-overview-parent',
    templateUrl: './overview-parent.component.html',
    styleUrls: ['./overview-parent.component.scss'],
})
export class OverviewParentComponent {
    hookLog: string[];
    hookColorArray: string[] = [];
    name: string;
    hasChild = false;
    private possibleNames = ['Billy', 'Matt', 'Nicholas', 'Sarah', 'Sofia'];
    private nextName: string;
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this.hookLog = logger.messages;
    }

    changeColors(newColorArray: string[]) {
        this.hookColorArray = newColorArray;
    }

    toggleChild(): void {
        this.hasChild = !this.hasChild;
        if (this.hasChild) {
            this.name = 'Billy';
            this.logger.clear();
        }
        this.hookLog = this.logger.messages;
    }

    randomizeName(): string {
        this.nextName = this.possibleNames[
            Math.floor(Math.random() * this.possibleNames.length)
        ];
        if (this.nextName === this.name) {
            return this.randomizeName();
        } else {
            return this.nextName;
        }
    }

    updateName(): void {
        this.name = this.randomizeName();
    }
}
