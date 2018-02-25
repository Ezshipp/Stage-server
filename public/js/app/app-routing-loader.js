import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
var AppCustomPreloader = /** @class */ (function () {
    function AppCustomPreloader() {
    }
    AppCustomPreloader.prototype.preload = function (route, load) {
        return route.data && route.data.preload ? load() : Observable.of(null);
    };
    return AppCustomPreloader;
}());
export { AppCustomPreloader };
