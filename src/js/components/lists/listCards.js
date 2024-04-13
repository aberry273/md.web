let component = `
    <div x-data="cardPost(
    {
      item: item,
    })"></div>
`
export default function (data) {
  return {
    // PROPERTIES
    items: [],
    async init() {
      const self = this;
      data = data != null ? data : {}
      this.items = data.items;
      component = data.component || component
      this.setHtml(data);

      this.$events.on(this.mxList_OnFilterChange, (updates) => {
        //console.log(updates);
      })

      this.$events.on('filter:posts', async (filterUpdates) => {
        let query = this._mxList_GetFilters(filterUpdates);
        
        const postQuery = this._mxSearch_CreateSearchQuery(query);
        if (postQuery == null) return;
        
        await this._mxSearch_CreateSearchQuery(postQuery);
      })

    },
    setHtml(data) {
      // make ajax request 
      const html = `
        <div x-transition x-data="mxList">
          <template x-for="(item, i) in items" :key="item.id || i" >
            ${component}
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