export class OrdersModel_admin {
    constructor(public JOB_TYPE?,
        public skip?,
        public orderId?,
        public bookingType?,
        public pickAddress?,
        public receiverName?,
        public receiverPhone?,
        public pickLongitude?,
        public pickLatitude?,
        public dropAddress?,
        public dropLatitude?,
        public dropLongitude?,
        public itemName?,
        public itemDescription?,
        public itemImage?,
        public item_actual_cost?,
        public deliverycharge?,
        public DriverID?,
        public ReasonID?,
        public cancellationReason?,
        public CustomerID?,
        public AdminID?,
        public limit?,
        public sortOptions?
    ) { }
}