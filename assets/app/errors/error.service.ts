import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { EventEmitter } from "@angular/core";

import { Error } from "./error.model";

export class ErrorService {

isSideNav:boolean
    DriverID;
    from_date;to_date
    itemCount:number=10;
    Total_Counts;Instant_Count;Four_Hours_Count;Same_Day_Count;

   constructor() {


    }
    errorOccurred = new EventEmitter<Error>();
    handleError(error: any) {
        const errorData = new Error(error);
        this.errorOccurred.emit(errorData);
    }
    setTodate(todate){

    }
    setFrom_date(date){

    }
    ConvertToCSV(objArray) {
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
                if (line != '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }



}