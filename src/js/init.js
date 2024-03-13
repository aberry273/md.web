/*
import { data } from '/js/data/index.js'
import { bindings } from '/js/bindings/index.js'
import * as stores from '/js/stores/index.js'

// Init shared bindings
Object.keys(bindings).map(x => Alpine.bind(x, bindings[x]))
const _bindings = Object.keys(bindings).map(x => { return [ x, bindings[x] ] })
// Init shared data scopes
Object.keys(data).map(x => Alpine.data(x, data[x]))
const _data = Object.keys(data).map(x => { return [ x, data[x] ] })
*/
// Init AsyncAlpine + Alpine + Components
//AsyncAlpine.init(Alpine);
//AsyncAlpine.alias(`js/components/[name].js`);
//AsyncAlpine.start();
//Alpine.start()

import alpinejs from 'https://cdn.skypack.dev/alpinejs';
// Manually load components with initial parameters set
alpinejs.data('htmlLoader', (ref, filePath) => ({
    init() {
        fetch(filePath).then(r => r.text()).then(html => {
            this.$refs[ref].innerHTML = html
        })
    }
}))

import * as components from './components/index.js';

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
alpinejs.start();