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
      //Events
      this.$events.on('action-reply', (item) => {
        self.selectedId = item.id;
      })
      this.$events.on('action-close', (item) => {
        self.selected = null;
      })
      this.$events.on('action-like', (item) => {
        this.$store.content.likePost(item)
      })
      this.$events.on('action-agree', (item) => {
        this.$store.content.agreePost(item)
      })
      this.$events.on('action-disagree', (item) => {
        this.$store.content.disagreePost(item)
      })
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
          
          <article>
            <div x-data="appFormResponse({
              postbackUrl: 'https://localhost:7220/api/contentpost',
              postbackType: 'POST',
              event: 'post:created',
            })"></div>
          </article>
          
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