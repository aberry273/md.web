
export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    // INIT
    init() {
      this.label = data.label;
      this.event = data.event;
      this.postbackType = data.postbackType
      this.fields = this.setFields()
      this.setHtml(data)
    },
    setFields() {
      return [
          {
            name: 'Content',
            type: 'textarea',
            placeholder: 'Whats your update?',
            autocomplete: null,
            ariaInvalid: true,
            helper: ''
          },
          {
            name: 'UserId',
            type: 'input',
            disabled: true,
            hidden: true,
            placeholder: 'Whats your update?',
            autocomplete: null,
            ariaInvalid: true,
            helper: '',
            value: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
          },
        ]
    },
    setHtml(data) {
      const html = `
        <div style="padding-bottom:12px;" x-data="formAjax({
          feed: $store.feedFilters.current,
          postbackUrl: 'https://localhost:7220/api/contentpostreply',
          postbackType: 'POST',
          event: 'post:created',
          fields: fields
          })"></div>`
        this.$nextTick(() => { 
          this.$root.innerHTML = html
        })
    },
  }
}