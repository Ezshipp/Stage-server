var PayServiceModel = /** @class */ (function () {
    function PayServiceModel(AdminID, Service_Charge, ExpiryDate, DiscountPercentage, Password, OldPassword, Enable_Exceeding_Weight, Price) {
        this.AdminID = AdminID;
        this.Service_Charge = Service_Charge;
        this.ExpiryDate = ExpiryDate;
        this.DiscountPercentage = DiscountPercentage;
        this.Password = Password;
        this.OldPassword = OldPassword;
        this.Enable_Exceeding_Weight = Enable_Exceeding_Weight;
        this.Price = Price;
    }
    return PayServiceModel;
}());
export { PayServiceModel };
