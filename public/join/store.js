class Store {
  constructor() {}

  commit(key, value) {
    const val = typeof value === 'object' && value !== null
      ? JSON.stringify(value)
      : value;
    return localStorage.setItem(key, val);
  }

  fetch(key) {
    return localStorage.getItem(key);
  }

  clear()  {
    return localStorage.clear();
  }

  delete(key) {
    return localStorage.removeItem(key);
  }
}
