export default function (data){
    return {
        // PROPERTIES
        mxWebsockets_Open: false,
        mxWebsockets_Service: null,
        mxWebsockets_Event: '',
        mxWebsockets_UserId: '',
        mxWebsockets_TargetThread: '',
        mxWebsockets_TargetChannel: '',

        // GETTERS
        get mxModal_GetOpen() { return this.mxSearch_Open },

        init() {
            this.$watch('mxWebsockets', () => { })
        },
        
        // METHODS
        _mxWebsockets_Init(data) {
            this.init();
            this.mxWebsockets_Event = data.event;
        },
        async _mxWebsockets_InitWebsocketEvents(wssService, userId, targetChannel, targetThread) {
            this.userId = userId;

            // On websocket client initialized, send channel to server
            this.$events.on(wssService.getConnectedEvent(), async (ev) => {
                await wssService.connectUser(userId);

                if (targetThread) {
                    await wssService.connectThread(userId, targetThread);
                }
                if (targetChannel) {
                    await wssService.connectChannel(userId, targetChannel);
                }
            })
            // On updates from the websocket
            this.$events.on(wssService.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxWebsockets_SendAlert(data);
                this.$events.emit(wssService.getMessageEvent(), data.data);
            })
        },
        _mxWebsockets_SendAlert(data) {
            const snackbarType = (data.code == 200) ? 'success' : 'error';
            const wasSuccess = (data.code == 200) ? 'successfully' : 'failed';
            const message = `${data.update} post ${wasSuccess}`
            const event = 'snackbar-add';//`snackbar-${snackbarType}`;
            this.$events.emit(event, { code: data.code, type: snackbarType, text: message });
        },
    }
}