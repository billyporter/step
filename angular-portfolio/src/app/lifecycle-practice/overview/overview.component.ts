import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges,
    SimpleChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    DoCheck,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { LoggerService } from '../logger.service';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent
    implements
        OnInit,
        OnChanges,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy {
    @Input() name: string;
    @Output() hookColorArray = new EventEmitter<string[]>();
    private flipflopColors: string[] = [];
    private stateColorMapping = new Map();
    private verb = 'initialized';
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.setColors();
        this.logger = logger;
    }

    flipflopEnable(): void {
        console.log('Flip: ' + this.flipflopColors);
        this.hookColorArray.emit(this.flipflopColors);
        this.flipflopColors = [];
    }

    ngOnInit(): void {
        this.logIt('OnInit');
        this.flipflopColors.push(this.stateColorMapping.get('OnInit'));
    }

    ngOnChanges(changes: SimpleChanges) {
        const changeMessages: string[] = [];
        for (const attribute in changes) {
            if (attribute === 'name') {
                const name = changes.name.currentValue;
                changeMessages.push(`name ${this.verb} to "${name}"`);
            } else {
                changeMessages.push(attribute + ' ' + this.verb);
            }
        }
        this.logIt(`OnChanges: ${changeMessages.join('; ')}`);
        this.verb = 'changed';
        this.flipflopColors.push(this.stateColorMapping.get('OnChanges'));
    }

    // Called in every change detection cycle anywhere on the page
    ngDoCheck() {
        this.logIt(`DoCheck`);
        this.flipflopColors.push(this.stateColorMapping.get('DoCheck'));
    }

    ngAfterContentInit() {
        this.logIt(`AfterContentInit`);
        this.flipflopColors.push(
            this.stateColorMapping.get('AfterContentInit')
        );
    }

    // Called in every change detection cycle anywhere on the page
    ngAfterContentChecked() {
        this.logIt(`AfterContentChecked`);
        this.flipflopColors.push(
            this.stateColorMapping.get('AfterContentChecked')
        );
    }

    ngAfterViewInit() {
        this.logIt(`AfterViewInit`);
        this.flipflopColors.push(this.stateColorMapping.get('AfterViewInit'));
    }

    // Called in every change detection cycle anywhere on the page
    ngAfterViewChecked() {
        this.logIt(`AfterViewChecked`);
        this.flipflopColors.push(
            this.stateColorMapping.get('AfterViewChecked')
        );
        this.flipflopEnable();
        console.log(this.hookColorArray);
    }

    ngOnDestroy() {
        this.logIt(`OnDestroy`);
        this.flipflopColors.push(this.stateColorMapping.get('OnDestroy'));
    }

    logIt(msg: string): void {
        this.logger.log(`${msg}`);
    }

    setColors(): void {
        this.stateColorMapping.set('OnInit', 'red');
        this.stateColorMapping.set('OnChanges', 'orange');
        this.stateColorMapping.set('DoCheck', 'yellow');
        this.stateColorMapping.set('AfterContentInit', 'green');
        this.stateColorMapping.set('AfterContentChecked', 'blue');
        this.stateColorMapping.set('AfterViewInit', 'indigo');
        this.stateColorMapping.set('AfterViewChecked', 'violet');
        this.stateColorMapping.set('OnDestroy', 'pink');
    }
}
