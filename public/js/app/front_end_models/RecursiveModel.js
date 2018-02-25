var RecursiveModal = /** @class */ (function () {
    function RecursiveModal(CustomerID, From_Date, To_Date, time, pickAddress, dropAddress, pickLatitude, pickLongitude, dropLatitude, dropLongitude, itemName, itemDescription, orderType, bookingType, receiverName, receiverPhone, paymentType, deliverycharge, Recursive_Order_Id, paymentId, SessionID) {
        this.CustomerID = CustomerID;
        this.From_Date = From_Date;
        this.To_Date = To_Date;
        this.time = time;
        this.pickAddress = pickAddress;
        this.dropAddress = dropAddress;
        this.pickLatitude = pickLatitude;
        this.pickLongitude = pickLongitude;
        this.dropLatitude = dropLatitude;
        this.dropLongitude = dropLongitude;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.orderType = orderType;
        this.bookingType = bookingType;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        this.paymentType = paymentType;
        this.deliverycharge = deliverycharge;
        this.Recursive_Order_Id = Recursive_Order_Id;
        this.paymentId = paymentId;
        this.SessionID = SessionID;
    }
    return RecursiveModal;
}());
export { RecursiveModal };
