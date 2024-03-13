export default (ref, filePath) => ({
    init() {
        fetch(filePath).then(r => r.text()).then(html => {
            console.log(ref)
            
            this.$refs[ref].innerHTML = html
        })
    }
})