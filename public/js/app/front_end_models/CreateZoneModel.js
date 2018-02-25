var CreateZoneModel = /** @class */ (function () {
    function CreateZoneModel(ZoneID, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity, draggable, editable, visible, ZonePaths, AdminID, ZoneTitle, CityID) {
        this.ZoneID = ZoneID;
        this.strokeColor = strokeColor;
        this.strokeOpacity = strokeOpacity;
        this.strokeWeight = strokeWeight;
        this.fillColor = fillColor;
        this.fillOpacity = fillOpacity;
        this.draggable = draggable;
        this.editable = editable;
        this.visible = visible;
        this.ZonePaths = ZonePaths;
        this.AdminID = AdminID;
        this.ZoneTitle = ZoneTitle;
        this.CityID = CityID;
    }
    return CreateZoneModel;
}());
export { CreateZoneModel };
