
export function saveObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function takeObject(key) {
    return JSON.parse(localStorage.getItem(key))
}
export function save(key, value) {
    localStorage.setItem(key, value)
}
export function take(key) {
    return localStorage.getItem(key)
}
export function remove(key) {
    localStorage.removeItem(key)
}