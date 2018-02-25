var OrderModel = /** @class */ (function () {
    function OrderModel(CustomerID, pickAddress, dropAddress, pickLatitude, pickLongitude, dropLatitude, dropLongitude, itemName, itemDescription, order_datetime, orderType, bookingType, receiverName, receiverPhone, paymentType, deliverycharge, OrderData, paymentId, Picture, itemImage, ImageID, SessionID, item_actual_cost, OFFER_CODE_APPLIED, ReferenceOfferID, OfferID, OfferType) {
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
        this.SessionID = SessionID;
        this.item_actual_cost = item_actual_cost;
        this.OFFER_CODE_APPLIED = OFFER_CODE_APPLIED;
        this.ReferenceOfferID = ReferenceOfferID;
        this.OfferID = OfferID;
        this.OfferType = OfferType;
    }
    return OrderModel;
}());
export { OrderModel };
