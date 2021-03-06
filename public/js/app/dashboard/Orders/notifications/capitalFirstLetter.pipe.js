var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  fromats to: Daniel
*/
var CapitalizeFirstPipe = /** @class */ (function () {
    function CapitalizeFirstPipe() {
    }
    CapitalizeFirstPipe.prototype.transform = function (value, args) {
        if (value === null)
            return 'Not assigned';
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    CapitalizeFirstPipe = __decorate([
        Pipe({
            name: 'capitalizeFirst'
        })
    ], CapitalizeFirstPipe);
    return CapitalizeFirstPipe;
}());
export { CapitalizeFirstPipe };
