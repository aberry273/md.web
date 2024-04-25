let component = `
    <div x-data="cardPost(
    {
      item: item,
    })"></div>
`
import mxList from '/src/js/mixins/mxList.js';
import mxSearch from '/src/js/mixins/mxSearch.js';
import mxAction from '/src/js/mixins/mxAction.js';
import mxWebsockets from '/src/js/mixins/mxWebsockets.js';
import mxAlert from '/src/js/mixins/mxAlert.js';
import mxModal from '/src/js/mixins/mxModal.js';

export default function (data) {
    return {
        // mixins
        ...mxList(data),
        ...mxSearch(data),
        ...mxAction(data),
        ...mxWebsockets(data),
        ...mxAlert(data),
        ...mxModal(data),

        // PROPERTIES
        items: [],
        selectedItem: {},
        userId: '',
        searchUrl: '',
        filterEvent: '',
        modalEvent: 'open-modal-media',
        itemEvent: '',
        quoteEvent: '',
        actionUrl: '',
        actionEvent: 'modal-media-action',
        modalId: 'gridCardMediaModal',

        async init() {
            const self = this;
            data = data != null ? data : {}
            this.actionUrl = data.actionUrl;
            this.items = data.items;
            this.searchUrl = data.searchUrl;
            this.userId = data.userId;

            component = data.component || component
            // init websockets
            await this._mxWebsockets_InitWebsocketEvents(
                this.$store.wssMediaBlobs,
                this.userId,
                this.targetChannel,
                this.targetThread,
            )

            // On updates from the websocket
            this.$events.on(this.$store.wssMediaBlobs.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxAlert_AddAlert(data);
                this.updateItemUpdate(data);
            }) 

            // On updates from filter
            this.$events.on(this.filterEvent, async (filterUpdates) => {
                await this.search(filterUpdates);
            })
            this.$events.on(this.modalEvent, async (item) => {
                this.$nextTick(() => {
                    this.selectedItem = item;
                    this._mxModal_Open(this.modalId)
                })
            })
            await this.initSearch();

            this.setHtml(data);
        },
        async initSearch() {
            let queryData = {}
            if (data.userId) queryData.userId = [data.userId]
            await this.search(queryData);
        },

        browseNextMedia() {
            if (this.selectedIndex == this.items.legnth - 1) return;
            this.selectedItem = this.items[this.selectedIndex + 1];
        },
        browsePreviousMedia() {
            if (this.selectedIndex == 0) return;
            this.selectedItem = this.items[this.selectedIndex - 1];
        },
        get selectedIndex() {
            if (this.selectedItem == null) return -1;
            return this.items.map(x => x.id).indexOf(this.selectedItem.id)
        },

        async editItem(item) {
            await this.$fetch.PUT(this.actionUrl, item);
            this._mxModal_Close(this.modalId)
        },

        async deleteItem(item) {
            const url = this.actionUrl + "/" + item.id;
            await this.$fetch.DELETE(url);
            this._mxModal_Close(this.modalId)
        },

        CreateActivityPayload(item) {
            return {
                userId: this.userId,
                contentPostId: item.id,
                action: request.action,
                value: null,
            }
        },

        updateItemUpdate(wssMessage) {
            var item = wssMessage.data;
            if (this.items == null) this.items = [];
            if (wssMessage.update == 'Created') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                if (index == -1) this.items.push(item);
                else this.items[index] = item
                console.log(item);
            }
            if (wssMessage.update == 'Updated') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                this.items[index] = item
            }
            if (wssMessage.update == 'Deleted') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                this.items.splice(index, 1);
            }
        },

        // METHODS
        async search(filters) {
            let query = this._mxList_GetFilters(filters);
            const postQuery = this._mxSearch_CreateSearchQuery(query, 0, 100); 
            if (postQuery == null) return;
            this.items = await this._mxSearch_Post(this.searchUrl, postQuery);
        },
        // METHODS
        setHtml(data) {
            // make ajax request 
            const html = `
            <div x-transition class="grid col-4" :class="items.length == 0 ? 'col-1' : ''">
              <template x-for="(item, i) in items" :key="item.id+item.updatedOn || i" >
                <div x-data="cardImage({
                  item: item,
                  userId: userId,
                  modalEvent: modalEvent,
                })"></div>
              </template>
              <template x-if="items == null || items.length == 0">
                <article>
                  <header><strong>No results!</strong></header>
                  No results could be found
                </article>
              </template>
            </div>
          
            <dialog :id="modalId">
                <article class="fullscreen">
                    <header>
                        <nav>
                        <ul>
                            <p>
                            <strong x-text="selectedItem.name"></strong>
                            </p>
                        </ul>
                        <ul>
                            <i 
                            :disabled="selectedIndex > 0"
                            aria-label="Previous" 
                            @click="browsePreviousMedia" 
                            class="icon material-icons icon-click" 
                            rel="prev">chevron_left</i>

                            <i aria-label="Next" 
                            :disabled="selectedIndex < items.length-1"
                            @click="browseNextMedia" 
                            class="icon material-icons icon-click" 
                            rel="prev">chevron_right</i>

                            <details class="dropdown flat no-chevron">
                                <summary role="outline">
                                    <i aria-label="Close" class="icon material-icons icon-click" rel="prev">more_vert</i>
                                </summary>
                                <ul>
                                    <li><a class="click" @click="editItem(selectedItem)">Edit</a></li>
                                    <li><a class="click" @click="deleteItem(selectedItem)">Delete</a></li>
                                </ul>
                            </details>

                            <button aria-label="Close" rel="prev" @click="_mxModal_Close(modalId)"></button>
                        </ul>
                        </nav>
                    </header>
                    <div>
                       <figure>
                            <img
                            :src="selectedItem.filePath"
                            :alt="selectedItem.name"
                          /> 
                      </figure>
                    </div>
                </article>
              
            </dialog> 
            `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}