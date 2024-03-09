const components1 = [
    'card',
    'content'
]
import { components } from '/components/index.js'

// Init AsyncAlpine + Alpine
AsyncAlpine.init(Alpine);
components.map(x => AsyncAlpine.alias(`components/${x}/[name].js`));
AsyncAlpine.start();

// Init logic
Alpine.data('dropdown', () => ({
    open: false,

    toggle() {
        this.open = ! this.open
        console.log('toggle')
    },
}))
