var smsCampaignModel = /** @class */ (function () {
    function smsCampaignModel(AdminID, CampaignName, CampaignType, CampaignMessage, CampaignID, skip, limit, sortOptions, SearchValue, ReferenceID) {
        this.AdminID = AdminID;
        this.CampaignName = CampaignName;
        this.CampaignType = CampaignType;
        this.CampaignMessage = CampaignMessage;
        this.CampaignID = CampaignID;
        this.skip = skip;
        this.limit = limit;
        this.sortOptions = sortOptions;
        this.SearchValue = SearchValue;
        this.ReferenceID = ReferenceID;
    }
    return smsCampaignModel;
}());
export { smsCampaignModel };
