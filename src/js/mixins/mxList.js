export default function (data){
    return {
        init() {
            this.filterEvent = data.filterEvent;
            this.presetFilters = data.filters;

            this.$watch('open', () => { })
        },
        // PROPERTIES
        presetFilters: {},
        filterEvent: 'filters:posts',
        fetchUrl: '/',
        // GETTERS
        get mxModal_Test() { return true },
        // METHODS
        _mxList_GetFilters(filters) {
            let query = this.presetFilters;
            const filterKeys = Object.keys(filters);
            for (var i = 0; i < filterKeys.length; i++) {
                const key = filterKeys[i];
                query[key] = filters[key];
            }
            return query;
        }
    }
}