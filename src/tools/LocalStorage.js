class LS {
    constructor(initialData) {
        if (initialData) {
            if (!this.isInstalled(initialData.key)) {
                this.set(initialData.key, initialData.data);
            }
        }
    }

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    get(key) {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }

    isInstalled(key) {
        return localStorage.getItem(key) ? true : false;
    }

    delete(key) {
        localStorage.removeItem(key);
    }

    clear(key) {
        localStorage.setItem(key, '');
    }

    clearAll() {
        localStorage.clear();
    }
}

export default LS;
