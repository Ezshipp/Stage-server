import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.itemCount = 10;
        this.errorOccurred = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errorData = new Error(error);
        this.errorOccurred.emit(errorData);
    };
    ErrorService.prototype.setTodate = function (todate) {
    };
    ErrorService.prototype.setFrom_date = function (date) {
    };
    ErrorService.prototype.ConvertToCSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    return ErrorService;
}());
export { ErrorService };
