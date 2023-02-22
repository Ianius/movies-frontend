export const fetchJSON = async (url: string, init?: RequestInit) => (await fetch(url, init)).json();
