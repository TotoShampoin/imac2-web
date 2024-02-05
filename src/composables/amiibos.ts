export async function fetchAllAmiibos() {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo`);
    const json = await res.json() as {amiibo: AmiiboType[]};
    return json.amiibo;
}
export async function fetchOneAmiibo(id: string) {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo?id=${id}`);
    const json = await res.json() as {amiibo: AmiiboType};
    return json.amiibo;
}

const AMIIBO_DATABASE = fetchAllAmiibos();

export async function getAllAmiibos() {
    return await AMIIBO_DATABASE;
}

export async function getOneAmiibo(id: string) {
    return (await AMIIBO_DATABASE).find(amiibo => id === `${amiibo.head}${amiibo.tail}`);
}


export type AmiiboType = {
    "amiiboSeries": string,
    "character": string,
    "gameSeries": string,
    "head": string,
    "image": string,
    "name": string,
    "release": {
        "au": string,
        "eu": string,
        "jp": string,
        "na": string
    },
    "tail": string,
    "type": string
}
