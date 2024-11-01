export const get = async (url) => {
    const resp = await fetch(url);
    return await resp.json();
};

const getContentType = (data): any => {
    if (data instanceof FormData) {
        return {};
    }
    return {
        'Content-Type': 'application/json' 
    }
};

const encodeData = (data) => {
    return (data instanceof FormData) ? data : JSON.stringify(data);
};

export const post = async (url, data) => {
    const resp = await fetch(url, { 
        method: 'POST', 
        body: encodeData(data),
        headers: {
            ...getContentType(data)
        }
     });
    return await resp.json();
};

export const put = async (url, data) => {
    const resp = await fetch(url, { 
        method: 'PUT', 
        body: encodeData(data),
        headers: {
            ...getContentType(data)
        }
     });
    return await resp.json();
};
