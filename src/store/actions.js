export default {
    saveUsername(context, payload) {
        context.commit("saveUsername", payload);
    },
    saveCartCount(context, payload) {
        context.commit("saveCartCount", payload);
    },
};