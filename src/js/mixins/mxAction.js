export default function (data){
    return {
        // PROPERTIES
        postbackUrl: '/',
        mxSearch_Open: false,
        
        // GETTERS
        get mxModal_GetOpen() { return this.mxSearch_Open },

        init() {
            this.$watch('mxSearch_Open', () => { })
            this.postbackUrl = data.postbackUrl;
        },
        
        // METHODS
        _mxAction_Init() {
            this.init();
        },
        async _mxAction_HandleAction(request) {
            const payload = this._mxAction_CreateActionPayload(request);
            const url = `${data.postbackUrl}/${request.action}`
            await this.$fetch.POST(url, payload);
        },
        _mxAction_CreateActionPayload(request) {
            return {
                userId: request.userId,
                contentPostId: request.item.id,
                agree: null,
                disagree: null,
                like: null,
            }
        },
    }
}