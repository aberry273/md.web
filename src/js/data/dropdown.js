export default () => ({
    init() {
        // This code will be executed before Alpine
        // initializes the rest of the component.
        console.log('logic/dropdown.js.toggle()')
        this.$watch('open', () => {
            console.log('dropdown.$watch.open')
        })
    },
    open: false,
 
    get isOpen() { return this.open },
    
    toggle() {
        console.log('t')
        this.open = ! this.open
    }
})