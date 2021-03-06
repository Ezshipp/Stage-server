export class BulkModel{
    constructor(public  CustomerID?,
                public pickAddress?,
                public dropAddress?,
                public pickLatitude?,
                public pickLongitude?,
                public dropLatitude?,
                public dropLongitude?,
                public itemName?,
                public itemDescription?,
                public order_datetime?,
                public orderType?,
                public bookingType?,
                public receiverName?,
                public receiverPhone?,
                public paymentType?,
                public deliverycharge?,
               public OrderData?: string[],
               public paymentId?,
               public Picture?,
               public itemImage?,
               public ImageID?,
               public ImageIDArray?: string[],
               public SessionID?
   ){}
}