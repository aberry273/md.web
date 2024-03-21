const defaults = {
  ms: 500,
  text: '<p><strong>title</strong></p><p>this is a new test of a auto-formatted markdown</p>',
}
export default function (data = {}) {
	return {
      show: false,
      text: '',
      init() {
        this.show = data.show;
        this.load(data);
        const self = this;
        
        // Listen for the event.
        window.addEventListener(data.event || "snackbar:open",
          (e) => {
            console.log(e)
            const data = {
              text: 'New post created!',
              success: true
            }
            self.load(data)
            self.show = true;
          }, false,
        );
      },
      show() {
        this.show = true;
      },
      load(data) {
        // Turn into object as it returns reactive Proxy
        //const data = JSON.parse(JSON.stringify(payload))
        this.$root.innerHTML = `
        <template x-if="show">
          <article class="is-fixed page-modal snackbar" x-transition>
            ${data.text}
            <i class="flat click material-icons" aria-label="Close" @click="show = false" rel="prev">close</i>
          </article>
        </template>`
      },
      defaults() {
        this.load(defaults)
      }
    }
}