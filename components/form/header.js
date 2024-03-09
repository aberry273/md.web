export default function header(data) {
    return {
      init() {
        this.$root.innerText = data;
        this.$root.innerHTML = `
          <header>
            <hgroup>
              <h1>${data.title}</h1>
              <p>${data.subtitle}</p>
              <p>${data.text}</p>
            </hgroup>
            <nav>
              <ul>
                <li><a href="#" data-theme-switcher="auto">Auto</a></li>
                <li><a href="#" data-theme-switcher="light">Light</a></li>
                <li><a href="#" data-theme-switcher="dark">Dark</a></li>
              </ul>
            </nav>
          </header>
        `;
      }
    };
  }