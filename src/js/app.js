// Init AsyncAlpine + Alpine + Components
window.addEventListener('alpine:init', () => {
    // STORES
    // Theme
    Alpine.store('darkmode', {
        on: false,

        toggle() {
            this.on = ! this.on
        }
    })
    // Tabs
    Alpine.store('tabs', {
        init() {},
        current: 'first',
     
        items: ['first', 'second', 'third'],
    
        setTab(tab) {
            this.current = tab;
        }
    })    

    Alpine.data('formData', () => ({
        inputData: 10
    }))

    // DATA
    Alpine.data('dropdown', () => ({
        init() {
            // This code will be executed before Alpine
            // initializes the rest of the component.
            this.$watch('open', (val) => {
                console.log(val)
            })
        },
        open: false,
    
        get isOpen() { return this.open },
        
        toggle() {
            this.open = ! this.open
        }
    }))

    //<div x-data x-ref="someRef" 
    //x-init="fetch('views/shared/bitcoin-form.html').then(r => r.text()).then(html => $refs.someRef.innerHTML = html)">
   
    Alpine.data('htmlLoader', (ref, filePath) => ({
        init() {
            fetch(filePath).then(r => r.text()).then(html => {
                this.$refs[ref].innerHTML = html
            })
        }
    }))

    // BINDINGS
    Alpine.bind('button', () => ({
        type: 'button',
     
        '@click'() {
            this.doSomething()
        },
    
        ':disabled'() {
            return this.shouldDisable
        },
    }))

    // Init AsyncAlpine + Alpine + Components
    AsyncAlpine.init(Alpine);
    AsyncAlpine.alias(`src/js/components/[name].js`);
    AsyncAlpine.start();
})

    
   