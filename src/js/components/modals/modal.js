const defaults = {
  ms: 500,
  text: '',
}
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400; // ms
let visibleModal = null;

// Get scrollbar width
const getScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return scrollbarWidth;
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

        
        this.load(data);
        const self = this;
        /*
        this.$events.on(data.event, (payload) =>{
          console.log('event payload');
          console.log(payload);
        })
        */
        // Listen for the event.
        window.addEventListener(this.event,
          (ev) => {
            console.log(ev)
            self.toggle()
          }, false,
        );
      },
      // Toggle modal
      toggle() {
        const modal = document.getElementById(this.id);
        if (!modal) return;
        modal && (modal.open ? this.close(modal) : this.open(modal));
      },

      // Open modal
      open() {
        const modal = document.getElementById(this.id);
        if (!modal) return;
        const { documentElement: html } = document;
        const scrollbarWidth = getScrollbarWidth();
        if (scrollbarWidth) {
          html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
        }
        html.classList.add(isOpenClass, openingClass);
        setTimeout(() => {
          visibleModal = modal;
          html.classList.remove(openingClass);
        }, animationDuration);
        modal.showModal();
      },

      // Close modal
      close() {
        const modal = document.getElementById(this.id);
        if (!modal) return;
        visibleModal = null;
        const { documentElement: html } = document;
        html.classList.add(closingClass);
        setTimeout(() => {
          html.classList.remove(closingClass, isOpenClass);
          html.style.removeProperty(scrollbarWidthCssVar);
          modal.close();
        }, animationDuration);
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
                  @click="close"
                ></button>
                <h3 x-text="title"></h3>
              </header>
              <p x-text="text"></p>
              <footer>
                <button
                  role="button"
                  class="secondary"
                  data-target="modal-example"
                  @click="toggle"
                >
                  Cancel</button
                ><button autofocus data-target="modal-example" @click="toggle">
                  Confirm
                </button>
              </footer>
            </article>
          </dialog>
            `
      },
      defaults() {
        this.load(defaults)
      }
    }
}