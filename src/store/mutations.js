export default {
    saveUsername(state, payload) {
        const { username = "" } = payload;
        state.username = username;
    },
    saveCartCount(state, payload) {
        const { cartCount = "" } = payload;
        state.cartCount = cartCount;
    },
};