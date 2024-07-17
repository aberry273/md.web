let component = `
    <div x-data="cardPost(
    {
      item: item,
    })"></div>
`
import { mxList, mxSearch, mxWebsockets, mxCardPost, mxAlert } from '/src/js/mixins/index.js';
export default function (data) {
    return {
        // mixins
        ...mxList(data),
        ...mxSearch(data),
        //...mxAction(data),
        ...mxWebsockets(data),
        ...mxAlert(data),
        ...mxCardPost(data),

        // PROPERTIES
        items: [],
        forceLoad: true,
        showReplies: false,
        userId: '',
        searchUrl: '',
        filterEvent: '',
        actionEvent: '',
        itemEvent: '',
        quoteEvent: '',
        filterUpdates: {},
        mergedFilters: {},

        async init() {
            const self = this;
            data = data != null ? data : {}
            this.forceLoad = data.forceLoad;
            this.items = data.items;
            this.showReplies = data.showReplies;
            this.filterEvent = data.filterEvent;
            this.actionEvent = data.actionEvent;
            this.itemEvent = data.itemEvent;
            this.searchUrl = data.searchUrl;
            this.userId = data.userId;
            this.parentId = data.parentId;
            this.channelId = data.channelId;
            this.quoteEvent = data.quoteEvent;
            this.filters = data.filters;
            this.mergedFilters = this.mergeFilters();

            component = data.component || component

            // On update post from the websocket 
            this._mxEvents_On(this.itemEvent, async (e) => {
                const msgData = e.data;
                if (!msgData) return;
                //check if item meeds filter criteria 
                var itemMatchesFilters = this.filterItem(msgData.data, mergedFilters);
                //Only live update items if the current filters apply
                if (itemMatchesFilters) {
                    this.items = this.$store.wssContentPosts.updateItems(this.items, msgData);
                }
            })

            // On updates from filter
            this.$events.on(this.filterEvent, async (filterUpdates) => {
                this.filterUpdates = filterUpdates; 
                this.mergedFilters = this.mergeFilters();
                filterUpdates.filters = this.mergedFilters;
                await this.initSearch(filterUpdates, false);
            })
            const defaultQuery = {
                filters: this.filters
            }
     
            if (this.forceLoad) await this.initSearch(defaultQuery);
            this.setHtml(data);
        },
        mergeFilters() {
            return { ...this.filters, ...this.filterUpdates.filters }
        },
        createReplyFilters(item) {
            const parentFilters = {
                parentId: item.id
            }
            return { ...parentFilters, ...this.filterUpdates.filters }
        },
        applyDefaultFilters(updates) {
            const keys = Object.keys(this.filters);
            for (let i = 0; i < keys.length; i++) {
                updates.filters[keys[i]] = this.filters[keys[i]]
            }
            return updates;
        },
        async initSearch(queryData, replaceItems = false) {
            //console.log(queryData);
            if (this.searchUrl) {
                const results = await this.$store.wssContentPosts.SearchByUrl(this.searchUrl, queryData, replaceItems);
                this.items = results.posts;
            }
            else {
                const results = await this.$store.wssContentPosts.Search(queryData, replaceItems);
                this.items = results.posts;
            }
        },
        toCamelCase(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        },
        filterItem(item, filters) {
            let match = true;
            if (filters == null) return match;
            const filterKeys = Object.keys(filters);
            if (filterKeys.length == 0) return match;
            for (var i = 0; i < filterKeys.length; i++) {
                const key = this.toCamelCase(filterKeys[i]);
                const filter = filters[filterKeys];
                const property = item[key];
                if (Array.isArray(property)) {
                    match = filter.every(ai => property.includes(ai));
                }
                else {
                    match = property == filter;
                }
            }
            return match;
        }, 
        toggleReplies(post) {
            if (!post) return;
            post.toggle = !post.toggle;
        },

        repliesToggled(post) {
            if (!post) return false;
            return post.toggle;
        },

        replies(post) {
            if (!post) return false;
            const rep = this._mxCardPost_getActionSummary(post.id).replies 
            return rep;
        },


        // METHODS
        setHtml(data) {
            // make ajax request 
            const html = `
            <div class="list">
                <template x-for="(item, i) in items" :key="item.id+item.threadId">
                    <div>
                        <div x-data="cardPost({
                            item: item,
                            userId: userId,
                            actionEvent: actionEvent,
                            updateEvent: item.id,
                        })"></div>


                        <!-- Replies -->
                        <div x-show="showReplies && replies(item) > 0 && !repliesToggled(item)">
                            <a class="line child click" @click="toggleReplies(item)">
                                <small class="pl">
                                    <small>
                                        <span>Show replies</span>
                                    </small>
                                </small>
                            </a>
                        </div>

                        <template x-if="repliesToggled(item)">
                            <div>
                                <a class="line child click" @click="toggleReplies(item)">
                                    <small class="pl">
                                        <small>
                                            <span>Hide replies</span>
                                        </small>
                                    </small>
                                </a>
                                <div class="line child mt-0"
                                    x-data="listCards( {
                                        searchUrl: searchUrl,
                                        filterEvent: filterEvent,
                                        actionEvent: actionEvent,
                                        itemEvent: $store.wssContentPosts.getMessageEvent(),
                                        parentId: item.id,
                                        filters: createReplyFilters(item),
                                        showReplies: true,
                                        forceLoad: true,
                                        userId: userId,
                                })"></div>
                                <hr />
                            </div>
                        </template>
                    </div>
                </template>

                <template x-if="items == null || items.length == 0">
                    <article>
                      <header><strong>No results!</strong></header>
                        No posts found
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