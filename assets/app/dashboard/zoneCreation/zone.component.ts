import { FullscreenControlOptions, Polygon } from '@agm/core/services/google-maps-types';
import { CreateZoneModel } from '../../front_end_models/CreateZoneModel';
import { MouseEvent } from 'angular2-google-maps/esm/core';
import { PolyMouseEvent } from 'angular2-google-maps/core';
import { AgmPolygon, LatLngLiteral, PolygonManager } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ManualOrderModel } from '../../front_end_models/manualorderModel';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services';
import { ErrorService } from '../../errors/error.service';
import { ZoneModal } from '../../front_end_models/ZoneEdit.model';
declare var google: any;
@Component({
    selector: 'app-zone',
    templateUrl: './zone.component.html',
    styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
    // directionsDisplay: any;
    // directionsService: any;
    // Center={lat: 17.3850, lng: 78.4867}

    // map: any;
    public ngOnInit(): void {
        // this.loadMap()

    }
    // loadMap(){
    //     this.directionsService = new google.maps.DirectionsService;
    //     this.directionsDisplay = new google.maps.DirectionsRenderer;
    //     this.map = new google.maps.Map(document.getElementById('map'), {
    //         center:this.Center,
    //         zoom: 10,
    //         fullscreenControl: true,

    //     });
    //     this.directionsDisplay.setMap( this.map);
    // }
    //  calculateAndDisplayRoute() {
    //      console.log("nete")
    //     this.directionsService.route({
    //       origin: {lat: 17.3850, lng: 78.4867},
    //       destination: {lat: 18.3850, lng: 78.4867},
    //       travelMode: 'DRIVING'
    //     }, (response, status) =>{
    //       if (status === 'OK') {
    //         this.directionsDisplay.setDirections(response);
    //       } else {
    //         window.alert('Directions request failed due to ' + status);
    //       }
    //     });
    //   }
    // getDir(){
    //     this.calculateAndDisplayRoute();

    // }
    // calculateAndDisplayRoute(latpick,lngpick,droplat,droplng) {
    //     console.log("nete")
    //    this.directionsService.route({
    //      origin: {lat: latpick, lng: lngpick},
    //      destination: {lat: droplat, lng: droplng},
    //      travelMode: 'DRIVING'
    //    }, (response, status) =>{
    //      if (status === 'OK') {
    //        this.directionsDisplay.setDirections(response);
    //      } else {
    //        window.alert('Directions request failed due to ' + status);
    //      }
    //    });
    //  }

}
