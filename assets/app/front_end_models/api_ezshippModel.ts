export class Api_EzshippModel {
    constructor(public AdminID?,
        public CategoryName?,
        public CategoryID?,
        public API_Name?,
        public API_Description?,

        public Api_Method?,
        public Api_URL?,
        public Api_Path?,
        public Api_Parameters?: any[],
        public Request_JSON?,

        public Content_Type?,
        public Request_Description?,
        public Success_Response?,
        public Success_Description?,
        public Error_Response?,

        public Error_Description?,
        public Error_Message_Status_Body?: any[],

    ) {

    }
}
