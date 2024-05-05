export default function (data){
    return {
        // PROPERTIES
        mxResponsive_Open: false,
        mxResponsive_Small: 576,
        mxResponsive_Medium: 768,
        mxResponsive_Large: 1024,
        mxResponsive_XLarge: 1280,
        mxResponsive_XXLarge: 1536,
        

        // GETTERS
        get mxResponsive_GetWindowWidth() { return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);  },

        get mxResponsive_IsXSmall() { return this.mxResponsive_GetWindowWidth < this.mxResponsive_Small },
        get mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_Small && this.mxResponsive_GetWindowWidth < this.mxResponsive_Medium},
        get mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_Medium && this.mxResponsive_GetWindowWidth < this.mxResponsive_Large},
        get mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_Large && this.mxResponsive_GetWindowWidth < this.mxResponsive_XLarge},
        get mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_XLarge && this.mxResponsive_GetWindowWidth < this.mxResponsive_XXLarge},
        get mxResponsive_IsXXLarge() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_XXLarge },

        init() {
        },
        
        // METHODS
        _mxWebsockets_Init(data) {
            this.init();
        },
    }
}