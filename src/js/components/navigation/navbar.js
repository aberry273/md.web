
function ahref(href, text) {
  return `<a href="${href}">${text}</a>`
}

function li(el) {
  return `<li>${el}</li>`
}

function list(links) {
  let link = ''
  if (links != null && links.length > 0) {
    link = `${ links.map(x => li(ahref(x.href, x.text))).join('') }`
  }
  return link
}

export default function navbar(data) {
    return {
      fixed: false,
      init() {
        const header = `<ul>${li(`<strong>${data.title}</strong>`)}</ul>`;
        let links = list(data.items)
        this.$root.innerHTML = `
          <nav style="height:50px" :class="fixed ? 'show' : 'hide'" ><ul></ul></nav>
          <nav 
            :class="fixed ? 'container sticky floating' : ''" 
            @scroll.window="fixed = (window.pageYOffset < 1) ? false: true">
            ${header}
            <ul>
              ${links}
            </ul>
          </nav>
        `;
      }
    };
  }