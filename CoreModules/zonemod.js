var ApiResponce = require("../Models/Apiresponce.js");
var ApiMessages = require("../Models/Apimessages.js");
var Customers = require("../Models/Customers.js");
var operators = require("../Models/operators.js");
var razorpay = require('../CoreModules/razorpay');
var htmlToPdf = require('html-to-pdf');
var crypto = require('crypto');
var uuid = require('uuid');
var rand = require('csprng');
var Config = require("../Config/config.js");
var config = require("../Config/config.js");
var Counters = require('../Models/Counters.js');
var Drivers = require('../Models/Drivers.js');
var Zone_Areas = require('../Models/Zone_Areas.js');
var ZONES = require('../Models/ZONES.js');
var Zone_Hubs = require('../Models/Zone_Hubs.js');
var ZoneMod = require('../CoreModules/zonemod.js');
var async = require('async');
var sync = require('sync');
var Country = require('../Models/Country.js');
var City = require('../Models/City.js');



exports.Find_All_Country_Cities = function (CountryData, callback) {
    var CityData = [];
    async.eachSeries(CountryData.cities, function (item, resp) {
        City.findOne({ _id: String(item) }, function (err, Result) {
            if (err) {
                console.log(err);
            } else {
                if (Result != null) {
                    CityData.push({
                        CityID: Result._id,
                        CityName: Result.name,
                        Latitude: Result.location.latitude,
                        longitude: Result.location.longitude
                    })
                    resp();
                } else if (Result == null) {
                    resp();
                }
            }
        })
    }, function (err) {
        if (!err) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    CityData: CityData
                }
            }));
        }
    })
}

exports.Make_City_Zone_Editable = function (values, ZoneData, CityData, callback) {
    var query = {
        _id: ZoneData._id
    };
    var changes = {
        'polygonProps.editable': true
    };
    var multiplicity = {
        multi: true
    };
    ZONES.update(query, changes, multiplicity, function (err, Result) {
        if (!err) {
            var newquery = {
                _id: {
                    $nin: [ZoneData._id]
                }
            }
            var newchanges = {
                'polygonProps.editable': false
            };
            ZONES.update(newquery, newchanges, multiplicity, function (err, Result2) {
                if (!err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Zone is now Editable"
                        }
                    }));
                }
            })
        }
    })
}

exports.Create_Zone_Paths = function (values, CityData, callback) {
    function GetZoneSeq(callback) {
        process.nextTick(function () {
            Counters.findOneAndUpdate({
                _id: "zone"
            }, {
                    $set: {
                        _id: "zone"
                    },
                    $inc: {
                        "seq": 1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    var zoneseq = parseInt(Result.seq) + 1;
                    callback(null, zoneseq);
                })
        })
    }
    function CreateCoordinateArray(values, callback) {
        process.nextTick(function () {
            var coordinatesArray = [];
            var PathArrayofArray = [];
            var length = values.ZonePaths.length;
            async.each(values.ZonePaths, function (item, resp) {
                var latlongArray = [];
                latlongArray.push(item.lng);
                latlongArray.push(item.lat);
                PathArrayofArray.push(latlongArray);
                resp();
            }, function (err) {
                var latlongArray = [];
                latlongArray.push(values.ZonePaths[0].lng);
                latlongArray.push(values.ZonePaths[0].lat);
                PathArrayofArray.push(latlongArray);
                coordinatesArray.push(PathArrayofArray);
                callback(null, coordinatesArray);
            })
        })
    }
    function ZonePathFunction(values, callback) {
        process.nextTick(function () {
            var ZonePaths = [];
            async.each(values.ZonePaths, function (item, resp) {
                ZonePaths.push({
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng)
                });
                resp();
            }, function (err) {
                callback(null, ZonePaths);
            })
        })
    }
    function Store_Zone_Functons(values, CityData, ZonePaths, coordinatesArray, zoneseq, callback) {
        process.nextTick(function () {
            console.log("zoneseq");
            console.log(zoneseq);
            var ZoneData = new ZONES({
                "city": CityData.name,
                "city_id": CityData._id,
                "title": values.ZoneTitle,
                "zoneseq": zoneseq,
                "pricing": [],
                "polygonProps.paths": ZonePaths,
                "polygonProps.strokeColor": values.strokeColor,
                "polygonProps.strokeOpacity": values.strokeOpacity,
                "polygonProps.strokeWeight": values.strokeWeight,
                "polygonProps.fillColor": values.fillColor,
                "polygonProps.fillOpacity": values.fillOpacity,
                "polygonProps.draggable": values.draggable,
                "polygonProps.editable": values.editable,
                "polygonProps.visible": values.visible,
                "polygons.type": "Polygon",
                "polygons.coordinates": coordinatesArray
            });
            ZoneData.save(function (err, Result) {
                if (err) {
                    var code = parseInt(err.code);
                    var msg;
                    if (code == 16755) {
                        msg = 1
                    } else {
                        msg = 2;
                    }
                    callback(null, msg);
                } else {
                    callback(null, 3);
                }
            })
        })
    }
    sync(function () {
        var coordinatesArray = CreateCoordinateArray.sync(null, values);
        var ZonePaths = ZonePathFunction.sync(null, values);
        var zoneseq = GetZoneSeq.sync(null);
        var Store_Zone = Store_Zone_Functons.sync(null, values, CityData, ZonePaths, coordinatesArray, zoneseq);
        if (Store_Zone == 1) {
            callback(new ApiResponce({
                success: false,
                extras: {
                    msg: 118
                }
            }));
        } else if (Store_Zone == 2) {
            callback(new ApiResponce({
                success: false,
                extras: {
                    msg: 1
                }
            }));
        } else if (Store_Zone == 3) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Created Successfully"
                }
            }));
        }
    })
}

exports.Edit_Zone_Path_Position = function (values, callback) {
    function CreateCoordinateArray(values, callback) {
        process.nextTick(function () {
            var coordinatesArray = [];
            var PathArrayofArray = [];
            var length = values.ZonePaths.length;
            async.each(values.ZonePaths, function (item, resp) {
                var latlongArray = [];
                latlongArray.push(item.lng);
                latlongArray.push(item.lat);
                PathArrayofArray.push(latlongArray);
                resp();
            }, function (err) {
                var latlongArray = [];
                latlongArray.push(values.ZonePaths[0].lng);
                latlongArray.push(values.ZonePaths[0].lat);
                PathArrayofArray.push(latlongArray);
                coordinatesArray.push(PathArrayofArray);
                callback(null, coordinatesArray);
            })
        })
    }
    function ZonePathFunction(values, callback) {
        process.nextTick(function () {
            var ZonePaths = [];
            async.each(values.ZonePaths, function (item, resp) {
                ZonePaths.push({
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng)
                });
                resp();
            }, function (err) {
                callback(null, ZonePaths);
            })
        })
    }
    function Edit_Zone_Function(values, ZonePaths, coordinatesArray, callback) {
        process.nextTick(function () {
            var query = {
                "_id": values.ZoneID
            };
            var changes = {
                $set: {
                    "polygonProps.paths": ZonePaths,
                    "polygonProps.strokeColor": values.strokeColor,
                    "polygonProps.strokeOpacity": values.strokeOpacity,
                    "polygonProps.strokeWeight": values.strokeWeight,
                    "polygonProps.fillColor": values.fillColor,
                    "polygonProps.fillOpacity": values.fillOpacity,
                    "polygonProps.draggable": values.draggable,
                    "polygonProps.editable": values.editable,
                    "polygonProps.visible": values.visible,
                    "polygons.coordinates": coordinatesArray
                }
            };
            ZONES.update(query, changes, function (err, Result) {
                if (err) {
                    var code = parseInt(err.code);
                    var msg;
                    if (code == 16755) {
                        msg = 1
                    } else {
                        msg = 2;
                    }
                    callback(null, msg);
                } else {
                    callback(null, 3);
                }
            })
        })
    }
    sync(function () {
        var coordinatesArray = CreateCoordinateArray.sync(null, values);
        var ZonePaths = ZonePathFunction.sync(null, values);
        var ZoneEdit = Edit_Zone_Function.sync(null, values, ZonePaths, coordinatesArray);
        if (ZoneEdit == 1) {
            callback(new ApiResponce({
                success: false,
                extras: {
                    msg: 118
                }
            }));
        } else if (ZoneEdit == 2) {
            callback(new ApiResponce({
                success: false,
                extras: {
                    msg: 1
                }
            }));
        } else if (ZoneEdit == 3) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Paths Updated Successfully"
                }
            }));
        }
    })
}
exports.Find_All_Zone_with_Postions = function (values, callback) {
    function ZoneDataFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                city_id: values.CityID
            };
            ZONES.find(query).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, Result);
                }
            })
        })
    };
    function ZonePathFunction(paths, callback) {
        process.nextTick(function () {
            var ZonePaths = [];
            async.each(paths, function (item, resp) {
                ZonePaths.push({
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng)
                });
                resp();
            }, function (err) {
                callback(null, ZonePaths);
            })
        })
    }
    sync(function () {
        var Result = ZoneDataFunction.sync(null, values);
        var ZoneData = [];
        async.each(Result, function (item, resp) {
            var ZonePaths = ZonePathFunction.sync(null, item.polygonProps.paths);
            ZoneData.push({
                ZoneID: item._id,
                ZoneTitle: item.title,
                zoneseq: item.zoneseq,
                ZoneCity: item.city,
                CityID: item.city_id,
                strokeColor: item.polygonProps.strokeColor,
                strokeOpacity: item.polygonProps.strokeOpacity,
                strokeWeight: item.polygonProps.strokeWeight,
                fillColor: item.polygonProps.fillColor,
                fillOpacity: item.polygonProps.fillOpacity,
                draggable: item.polygonProps.draggable,
                editable: item.polygonProps.editable,
                visible: item.polygonProps.visible,
                ZonePaths: ZonePaths
            });
            resp();
        }, function (err) {
            if (!err) {
                callback(new ApiResponce({
                    success: true,
                    extras: {
                        ZoneData: ZoneData
                    }
                }));
            }
        })
    })
}


//Find All Zone Areas
exports.Find_All_Zone_Hubs = function (ZoneData, callback) {
    var query = {
        ZoneID: ZoneData._id,
        Status: true
    };
    Zone_Hubs.find(query).sort('ZoneHubName').select('ZoneID ZoneHubID ZoneHubName Address Latitude Longitude -_id').exec(function (err, Result) {
        callback(new ApiResponce({
            success: true,
            extras: {
                HubData: Result
            }
        }));
    });
};
exports.Inactive_Remove_Zone_Hub = function (values, callback) {
    var query = {
        ZoneHubID: values.ZoneHubID
    }
    var changes = {
        $set: {
            Status: false
        }
    };
    Zone_Hubs.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Hub Removed or Inactivated Successfully"
                }
            }));
        }
    });
}
exports.Update_Zone_Hub = function (values, callback) {
    var query = {
        ZoneHubID: values.ZoneHubID
    }
    var ZoneHubName = ZoneMod.Format_Beautify_String(values.ZoneHubName);
    var Address = ZoneMod.Format_Beautify_String(values.Address);
    var changes = {
        $set: {
            ZoneHubName: ZoneHubName,
            Address: Address,
            Latitude: parseFloat(values.Latitude),
            Longitude: parseFloat(values.Longitude),
            Point: [parseFloat(values.Longitude), parseFloat(values.Latitude)]
        }
    };
    Zone_Hubs.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Hub Updated Successfully"
                }
            }));
        }
    });
}
exports.Check_for_ZoneHubID = function (values, callback) {
    var error;
    var query = {
        ZoneHubID: values.ZoneHubID
    };
    Zone_Hubs.findOne(query).exec(function (err, Result) {
        if (Result) {
            error = false;
            return callback(false, Result);
        } else {
            error = true;
            return callback(error, new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.Zone_Hub_Not_Found
                }
            }));
        }
    });
};
exports.Create_Zone_Hub = function (values, callback) {
    var ZoneHubID = uuid();
    var ZoneHubName = ZoneMod.Format_Beautify_String(values.ZoneHubName);
    var Address = ZoneMod.Format_Beautify_String(values.Address);
    var date = new Date();
    var HubData = new Zone_Hubs({
        ZoneID: values.ZoneID,
        ZoneHubID: ZoneHubID,
        ZoneHubName: ZoneHubName,
        Address: Address,
        Latitude: parseFloat(values.Latitude),
        Longitude: parseFloat(values.Longitude),
        Point: [parseFloat(values.Longitude), parseFloat(values.Latitude)],
        created_at: date,
        updated_at: date
    })
    HubData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Hub Created Successfully"
                }
            }));
        }
    })
}

//Find All Zone Areas
exports.Find_All_Zone_Areas = function (ZoneData, callback) {
    var query = {
        ZoneID: ZoneData._id
    };
    Zone_Areas.find(query).sort('AreaName').select('AreaID AreaName ZoneID -_id').exec(function (err, Result) {
        callback(new ApiResponce({
            success: true,
            extras: {
                AreaData: Result
            }
        }));
    });
};
exports.Remove_Zone_Area = function (values, callback) {
    var query = {
        AreaID: values.AreaID
    };
    Zone_Areas.find(query).remove().exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Area Removed Successfully"
                }
            }));
        }
    })
};
exports.Update_Zone_Area = function (values, callback) {
    var query = {
        AreaID: values.AreaID
    }
    var AreaName = ZoneMod.Format_Beautify_String(values.AreaName);
    var changes = {
        $set: {
            AreaName: AreaName
        }
    };
    Zone_Areas.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Area Updated Successfully"
                }
            }));
        }
    });
}

//Store Zone Area
exports.Create_Zone_Area = function (values, callback) {
    var AreaID = uuid.v4();
    var AreaName = ZoneMod.Format_Beautify_String(values.AreaName);
    var date = new Date();
    var AreaData = new Zone_Areas({
        AreaID: AreaID,
        AreaName: AreaName,
        ZoneID: values.ZoneID,
        created_at: date,
        updated_at: date
    });
    AreaData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Zone Area Stored Successfully"
                }
            }));
        }
    })
}
exports.Check_for_AreaID = function (values, callback) {
    var error;
    var query = {
        AreaID: values.AreaID
    };
    Zone_Areas.findOne(query).exec(function (err, Result) {
        if (Result) {
            error = false;
            return callback(false, Result);
        } else {
            error = true;
            return callback(error, new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.Zone_Area_Not_Found
                }
            }));
        }
    });
};
exports.Check_for_ZoneID = function (values, callback) {
    var error;
    var query = {
        _id: values.ZoneID
    };
    ZONES.findOne(query).exec(function (err, Result) {
        if (Result) {
            error = false;
            return callback(false, Result);
        } else {
            error = true;
            return callback(error, new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.Zone_Not_Found
                }
            }));
        }
    })
};
//Formatted String
exports.Format_Beautify_String = function (string) {
    string = string.replace(/\s\s+/g, ' ');
    string = string.replace(/  +/g, ' ');
    string = string.replace(/^ /, '');
    string = string.replace(/\s\s*$/, '');
    string = titleString(string);
    function titleString(str) {
        var myArr = str.toLowerCase().split(" ");
        for (var a = 0; a < myArr.length; a++) {
            myArr[a] = myArr[a].charAt(0).toUpperCase() + myArr[a].substr(1);
        }
        return myArr.join(" ");
    }
    return string;
};