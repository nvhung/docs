export const get = async (url) => {
    const resp = await fetch(url);
    return await resp.json();
};
