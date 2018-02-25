export class ErrorResponseModel {
    constructor(public AdminID?,
        public API_ID?,
        public Error_Response?: any[],
        public Error_Description?,
        public ListID?,
        public msg?,
        public Status?) {

    }
}
