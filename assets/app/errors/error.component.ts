import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
        .modal {
       background-color: transparent;
       box-shadow: none;
   }
   .button-custom {
       padding: 10px;
       font-size: 18px;
       background-color: transparent;
       box-shadow: none;
       color: #12a6f1;
       border: 1px solid #12a6f1;
       border-radius: 5px;
       font-weight: 600;
   }
   .button-custom:hover {
       background-color: transparent;
       color:#12a6f1
   }
   .button-custom:focus {
       background-color: transparent;
       color:#12a6f1
   }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';
    loading_div: boolean = false;
    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );

    }


}

