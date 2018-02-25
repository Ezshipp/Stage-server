var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { ErrorService } from "./error.service";
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService) {
        this.errorService = errorService;
        this.display = 'none';
        this.loading_div = false;
    }
    ErrorComponent.prototype.onErrorHandled = function () {
        this.display = 'none';
    };
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccurred
            .subscribe(function (error) {
            _this.error = error;
            _this.display = 'block';
        });
    };
    ErrorComponent = __decorate([
        Component({
            selector: 'app-error',
            templateUrl: './error.component.html',
            styles: ["\n        .backdrop {\n            background-color: rgba(0,0,0,0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100vh;\n        }\n        .modal {\n       background-color: transparent;\n       box-shadow: none;\n   }\n   .button-custom {\n       padding: 10px;\n       font-size: 18px;\n       background-color: transparent;\n       box-shadow: none;\n       color: #12a6f1;\n       border: 1px solid #12a6f1;\n       border-radius: 5px;\n       font-weight: 600;\n   }\n   .button-custom:hover {\n       background-color: transparent;\n       color:#12a6f1\n   }\n   .button-custom:focus {\n       background-color: transparent;\n       color:#12a6f1\n   }\n    "]
        }),
        __metadata("design:paramtypes", [ErrorService])
    ], ErrorComponent);
    return ErrorComponent;
}());
export { ErrorComponent };
