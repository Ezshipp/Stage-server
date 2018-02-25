export class vendor_OrderModel {
    constructor(
        public skip?,
        public VendorName?,
        public VendorEmail?,
        public VendorPhone?,
        public PickAddress?,
        public PickLatitude?,
        public PickLongitude?,
        public Price?,
        public VendorID?,
        public SearchValue?,
        public DriverData?: string[],
        public VendorOrderID?
              ){}
}