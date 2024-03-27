import input from './fields/input.js'
import textarea from './fields/textarea.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    // INIT
    init() {
      this.label = data.label;
      this.setHtml(data)
    },
    // METHODS
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      return input(field)
    },
    setHtml(data) {
      // make ajax request
      const label = data.label || 'Submit'
      this.fields = data.fields || []
      this.$root.innerHTML = ` 
        <template x-for="(field, i) in fields" :key="field.name+i"> 
          <label x-html="renderField(field)" :for="field.name" x-show="!field.hidden"></label>
        </template> 
      `
    },
  }
}