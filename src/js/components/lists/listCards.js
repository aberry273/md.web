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

export default function (data) {
  return {
    // mixins
    ...mxList(data),
    ...mxSearch(data),
    ...mxAction(data),
    ...mxWebsockets(data),

    // PROPERTIES
    items: [],
    userId: '',
    searchUrl: '', 
    searchEvent: '',
    actionEvent: '',
    itemEvent: '',

    async init() {
      const self = this;
      data = data != null ? data : {}
      this.items = data.items;
      this.searchEvent = data.searchEvent;
      this.actionEvent = data.actionEvent;
      this.itemEvent = data.itemEvent;
      this.searchUrl = data.searchUrl;
      this.userId = data.userId;

      component = data.component || component

      // On updates from cards
      this.$events.on(this.actionEvent, async (e) => {
        await this._mxAction_HandleAction(e);
      })

      // On updates from filter
      this.$events.on(this.searchEvent, async (filterUpdates) => {
        await this.search(filterUpdates);
      })

      // Setup websocket listeners
      await this._mxWebsockets_InitWebsocketEvents(
        this.$store.wssContentPosts,
        this.userId,
        'targetThread123',
        'targetChannel123'
      )
      await this._mxWebsockets_InitWebsocketEvents(
        this.$store.wssContentPostReviews,
        this.userId,
        'targetThread123',
        'targetChannel123'
      )

      await this.search({});
      
      this.setHtml(data);
    },
    // METHODS
    async search(filters) {
      let query = this._mxList_GetFilters(filters);
      const postQuery = this._mxSearch_CreateSearchQuery(query);
      if (postQuery == null) return;
      this.items = await this._mxSearch_Post(this.searchUrl, postQuery);
    },

    // METHODS
    setHtml(data) {
      // make ajax request 
      const html = `
        <div x-transition>
          <template x-for="(item, i) in items" :key="item.id || i" >
            <div x-data="cardPost({
              item: item,
              userId: userId,
              updateEvent: itemEvent,
            })"></div>
          </template>
          <template x-if="items == null || items.length == 0">
            <article>
              <header><strong>No results!</strong></header>
              No results could be found
            </article>
          </template>
        </div>
        `
      this.$nextTick(() => {
          this.$root.innerHTML = html
      });
    },
  }
}