// TODO
export default () => (el, data) => {
    return {
        emit(ev, payload) {
            const event = new CustomEvent(event, payload);
            window.dispatchEvent(event);
        },
        on(ev, cb) {
            // Listen for the event.
            window.addEventListener(
            ev,
                (e) => {
                    cb(e)
                },
                false,
            );
        },
    }
}