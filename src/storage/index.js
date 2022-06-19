const STORAGE_KEY = "mall";

/**
 * storage.setItem("a", 1);
 * storage.setItem("user", { a: 1 });
 * storage.setItem("abc", { a: 1 }, "user");
 */

export default {
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val);
        } else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }
    },

    getItem(key, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            if (val) {
                return val[key];
            }
        }
        return this.getStorage()[key];
    },

    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
    },

    clear(key, module_name) {
        let val = this.getStorage();
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
};