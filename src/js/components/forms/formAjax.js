import input from './fields/input.js'
import textarea from './fields/textarea.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    loading: false,
    event: null,
    postbackType: 'POST',
    // INIT
    init() {
      this.label = data.label;
      this.event = data.event;
      this.postbackType = data.postbackType
      this.setHtml(data)
    },
    // METHODS
    submitForm() {
    },
    filterPosts(feed) {
      this.loading = true;
      this.filtered = this.$store.content.items.filter(x => x.feed == feed);
      this.loading = false;
    },
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      
      return input(field)
    },
    async submit(fields) {
      this.loading = true;
      const payload = {}
      fields.map(x => {
        payload[x.name] = x.value
        return payload
      })
      let response = null;
      switch (this.postbackType) {
        case 'POST':
          response = this.$fetch.POST(data.postbackUrl, payload);
          break;
        case 'PUT':
          response = this.$fetch.PUT(data.postbackUrl, payload);
          // Expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        case 'GET':
          response = this.$fetch.GET(data.postbackUrl, payload);
          // Expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        case 'DELETE':
          response = this.$fetch.DELETE(data.postbackUrl, payload);
          // Expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          response = null;
      }

      if(this.event) {
        this.$dispatch(this.event, response)
      }
      this.resetValues(fields);
      this.loading = false;
    },
    resetValues(fields) {
      for(var i = 0; i < fields.length; i++) {
        fields[i].value = null;
      }
    },
    setHtml(data) {
      // make ajax request
      const label = data.label || 'Submit'
      this.fields = data.fields || []
      this.$root.innerHTML = `
        <div>
          <progress x-show="loading"></progress>
          <fieldset>
            <template x-for="(field, i) in fields" :key="field.name+i"> 
              <label x-html="renderField(field)" x-show="!field.hidden"></label>
            </template>
          </fieldset>
          <button @click="await submit(fields)" :disabled="loading">${label}</button>
        </div>
      `
    },
  }
}