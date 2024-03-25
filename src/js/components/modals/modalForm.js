import { open, close, toggle, isOpenClass, openingClass, closingClass, scrollbarWidthCssVar, animationDuration } from './utilities.js'
const form = {
    postbackUrl: 'https://localhost:7220/api/contentpost',
    postbackType: 'PUT',
    event: 'post:updated',
    fields: [
      {
        name: 'Content',
        type: 'textarea',
        placeholder: 'Whats your update?',
        autocomplete: null,
        ariaInvalid: false,
        helper: ''
      },
      {
        name: 'Id',
        type: 'input',
        placeholder: 'Whats your update?',
        autocomplete: null,
        disabled: true,
        hidden: true,
      },
      {
        name: 'UserId',
        type: 'input',
        disabled: true,
        hidden: true,
        placeholder: 'Whats your update?',
        autocomplete: null,
        ariaInvalid: false,
        helper: '',
        value: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      },
    ]
};

export default function (data = {}) {
	return {
      show: false,
      text: '',
      id: '',
      event: '',
      // data
      title: '',
      text: '',
      init() {
        this.show = data.show;
        // either use id, event for separate targets, or use the target property to simplify
        this.id = data.id || data.target
        this.event = data.event || data.target;
        // view data
        this.title = data.title;
        this.text = data.text;
        this.formData = form;


        this.load(data);
        const self = this;
        // Listen for the event.
        window.addEventListener(this.event,
          (ev) => {
            const payload = ev.detail;
            console.log(payload)
            self.formData.postbackUrl += '/'+payload.id;
            self.formData.fields[0].value = payload.content;
            self.formData.fields[1].value = payload.id;
            self.formData.fields[2].value = payload.userId;
            self.toggle()
          }, false,
        );
      },
      toggle() {
        toggle(this.id)
      },
      load(data) {
        this.$root.innerHTML = `
          <!-- Edit post -->
          <dialog id="${this.id}">
            <article>
              <header>
                <button
                  aria-label="Close"
                  rel="prev"
                  data-target="modal-example"
                  @click="toggle"
                ></button>
                <h3 x-text="title"></h3>
              </header>
              <div x-data="formAjax(formData)"></div>
            </article>
          </dialog>
            `
      },
      defaults() {
        this.load(defaults)
      }
    }
}