
export default function card(message) {
	return {
        init() {
          this.$root.innerHTML = `
            <article>
                <header>Header</header>
                Body
                <footer>Footer</footer>
            </article>
          `;
        }
    }
}