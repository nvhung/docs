export const get = async (url) => {
    const resp = await fetch(url);
    return await resp.json();
};

export const post = async (url, data) => {
    const resp = await fetch(url, { method: 'POST', body: data });
    return await resp.json();
};

export const put = async (url, data) => {
    const resp = await fetch(url, { method: 'PUT', body: data });
    return await resp.json();
};
