import input from './fields/input.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    // INIT
    init() {
      this.setHtml(data)
    },
    // METHODS
    submitForm() {
    },
    filterPosts(feed) {
      this.loading = true;
      this.filtered = this.$store.feeds.items.filter(x => x.feed == feed);
      this.loading = false;
    },
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      
      return input(field)
    },
    setHtml(data) {
      // make ajax request
      this.fields = data.fields || []
      this.$root.innerHTML = `
      <form>
        <fieldset>
          <template x-for="(field, i) in fields" :key="field.name+i"> 
            <label x-html="renderField(field)"></label>
          </template>
        </fieldset>
        <input type="submit" value="Submit"/>
      </form>
      `
    },
  }
}