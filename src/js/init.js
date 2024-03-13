//Based on
//https://dev.to/keuller/build-modular-app-with-alpinejs-2ece

import alpinejs from 'https://cdn.skypack.dev/alpinejs';
// Manually load components with initial parameters set
alpinejs.data('html', (ref, filePath) => ({
    init() {
        fetch(filePath).then(r => r.text()).then(html => {
            const self = this
            this.$nextTick(() => { self.$refs[ref].innerHTML = html });
        })
    }
}))

import * as components from './components/index.js';
Object.keys(components).forEach(component => {
    let data = components[component]();
    alpinejs.data('_'+component, () => data);
});

// Load data
import * as comps from './data/index.js';
Object.keys(comps).forEach(comp => {
    let data = comps[comp]();
    alpinejs.data(comp, () => data);
});
// Load bindings
import * as bindings from './bindings/index.js';
Object.keys(bindings).forEach(binding => {
    let data = bindings[binding]();
    alpinejs.bind(binding, () => data);
});
// Load stores
import * as stores from './stores/index.js';
Object.keys(stores).forEach(store => {
    let data = stores[store]();
    alpinejs.store(store, data);
});
// Load directives
import * as directives from './directives/index.js';
Object.keys(directives).forEach(directive => {
    let data = directives[directive];
    alpinejs.directive(directive, data);
});
// Load magics
import * as magics from './magics/index.js';
Object.keys(magics).forEach(magic => {
    let data = magics[magic];
    alpinejs.magic(magic, data);
});

window.alpinejs = alpinejs
alpinejs.start();

