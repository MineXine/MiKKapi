"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMonthKey = exports.toDateKey = exports.throttleByKey = exports.randomToken = exports.toTreeByRecursion = exports.urlToObj = void 0;
function urlToObj(str) {
    const obj = {};
    const arr1 = str.includes('?') ? str.split('?') : ['', str];
    const arr2 = arr1[1].split('&');
    for (let i = 0; i < arr2.length; i++) {
        const res = arr2[i].split('=');
        obj[res[0]] = res[1];
    }
    return obj;
}
exports.urlToObj = urlToObj;
function toTreeByRecursion(data, parentKey = 'id', childrenKey = 'parentMenu') {
    const parents = data.filter((children) => !children[childrenKey]);
    const children = data.filter((children) => children[childrenKey]);
    dataToTree(parents, children);
    function dataToTree(parents, children) {
        parents.map((p) => {
            children.map((c, i) => {
                if (p[parentKey].equals(c[childrenKey])) {
                    const _children = [...children];
                    _children.splice(i, 1);
                    dataToTree([c], _children);
                    if (p.children) {
                        p.children.push(c);
                    }
                    else {
                        p.children = [c];
                    }
                }
                else {
                    if (!parents.find((item) => item._id.equals(c[childrenKey]))) {
                        parents.push(c);
                    }
                }
            });
        });
        if (parents.length === 0 && children.length > 0) {
            parents.push(...children);
        }
    }
    return parents;
}
exports.toTreeByRecursion = toTreeByRecursion;
function randomToken(length = 16) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let out = '';
    for (let i = 0; i < length; i++) {
        out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
}
exports.randomToken = randomToken;
function throttleByKey(key, ttl, fn, store = new Map()) {
    const now = Date.now();
    const last = store.get(key) || 0;
    if (now - last < ttl)
        return false;
    store.set(key, now);
    fn();
    return true;
}
exports.throttleByKey = throttleByKey;
function toDateKey(date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${day}`;
}
exports.toDateKey = toDateKey;
function toMonthKey(date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    return `${y}-${m}`;
}
exports.toMonthKey = toMonthKey;
//# sourceMappingURL=utils.js.map