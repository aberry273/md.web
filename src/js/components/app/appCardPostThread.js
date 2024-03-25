export default function (data) {
	return {
    // PROPERTIES
    item: null,
    tabs: [ 'all', 'agrees', 'disagrees'],
    selectedTab: '',
    selectedId: {},
    init() {
      data.item.expanded = true;
      this.item = data.item;
      
      // Listen for the event.
      window.addEventListener('action-reply',
        (e) => {
          const item = e.detail;
          self.selectedId = item.id;
        }, false);

      window.addEventListener('action-close',
        (e) => {
          console.log('close')
          self.selected = null;
      }, false);

      this.setHtml(data);
    },
    testFunction() {
      console.log('test');
    },
    setTab(tab) {
      this.selectedTab = tab;
    },
    setHtml(data) {
      // make ajax request
      const html = `
        <div>
          <nav aria-label="breadcrumb">
            <ul>
              <li><a href="#">< Return</a></li>
            </ul>
          </nav>
          
          <div x-data="appCardPostReply({
            item,
            expandable: false,
          })"></div>
          
          <template x-if="selectedId == item.id">
            <article x-data="appFormReply({
              postbackUrl: 'https://localhost:7220/api/contentpost',
              postbackType: 'POST',
              event: 'post:created',
            })"></article>
          </template>

          <!--Feed-->
          <div>
          <nav>
            <!--Filters-->
            <ul>
              <li>
                <!--Agreements-->
                <details class="dropdown">
                  <summary role="button" class="outline flat">
                    All
                  </summary>
                  <ul>
                    <li><a href="#">All</a></li>
                    <li><a href="#">Agrees</a></li>
                    <li><a href="#">Disagrees</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <!--Sort-->
                <details class="dropdown">
                  <summary class="flat tab" >Sort</summary>
                  <ul>
                    <li><a href="#">Created</a></li>
                    <li><a href="#">Updated</a></li>
                    <li><a href="#">Ratings</a></li>
                    <li><a href="#">Likes</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <!--Tags-->
                <details class="dropdown">
                  <summary class="flat">
                    Tags
                  </summary>
                  <ul>
                    <li>
                      <label>
                        <input type="checkbox" name="csharp" />
                        C#
                      </label>
                    </li> 
                  </ul>
                </details>
                </li>
              </ul>
            </nav>
            <!--Responses-->
            <main x-transition>
              <div x-data="appFeedReplies({
                sourceUrl: 'https://localhost:7220/api/contentpost',
                event: 'post:created',
                items: $store.content.replies,
              })"
              x-init="await fetchItems()"></div>
             </main>
          </div>
        </div>
      `
      this.$nextTick(() => { 
        this.$root.innerHTML = html
      })
    },
  }
}