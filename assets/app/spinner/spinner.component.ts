
import { Input, Component } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata';  
'use strict'; 
 
@Component({
    selector: 'my-spinner',
    templateUrl: "spinner.component.html",
    styleUrls:["spinner.component.css"]
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout:any;
    isDelayedRunning: boolean = false; 
     public display='none'
     public color = 'red' 
    @Input()
    public delay: number = 300; 
    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        } 
        if (this.currentTimeout) {
            return;
        } 
        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.display='block'
            this.color='pink'
            this.cancelTimeout();
        }, this.delay);
    } 
    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    } 
    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}