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