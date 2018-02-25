var BulkModel = /** @class */ (function () {
    function BulkModel(CustomerID, pickAddress, dropAddress, pickLatitude, pickLongitude, dropLatitude, dropLongitude, itemName, itemDescription, order_datetime, orderType, bookingType, receiverName, receiverPhone, paymentType, deliverycharge, OrderData, paymentId, Picture, itemImage, ImageID, ImageIDArray, SessionID) {
        this.CustomerID = CustomerID;
        this.pickAddress = pickAddress;
        this.dropAddress = dropAddress;
        this.pickLatitude = pickLatitude;
        this.pickLongitude = pickLongitude;
        this.dropLatitude = dropLatitude;
        this.dropLongitude = dropLongitude;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.order_datetime = order_datetime;
        this.orderType = orderType;
        this.bookingType = bookingType;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        this.paymentType = paymentType;
        this.deliverycharge = deliverycharge;
        this.OrderData = OrderData;
        this.paymentId = paymentId;
        this.Picture = Picture;
        this.itemImage = itemImage;
        this.ImageID = ImageID;
        this.ImageIDArray = ImageIDArray;
        this.SessionID = SessionID;
    }
    return BulkModel;
}());
export { BulkModel };
