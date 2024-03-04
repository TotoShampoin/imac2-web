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

let AMIIBO_DATABASE: AmiiboType[] = [];

let is_filled = false;
async function fillWithAllAmiibos() {
    if(is_filled) return;
    AMIIBO_DATABASE = await fetchAllAmiibos();
    is_filled = true;
}
async function fillWithOneAmiibo(id: string) {
    if(is_filled) return;
    AMIIBO_DATABASE = [await fetchOneAmiibo(id)];
}
async function fillWithNAmiibos(...ids: string[]) {
    if(is_filled) return;
    AMIIBO_DATABASE = await Promise.all(ids.map(id => fetchOneAmiibo(id)));
}

export async function getAllAmiibos() {
    await fillWithAllAmiibos();
    return AMIIBO_DATABASE;
}

export async function getOneAmiibo(id: string) {
    await fillWithOneAmiibo(id);
    return (AMIIBO_DATABASE).find(amiibo => id === `${amiibo.head}${amiibo.tail}`);
}

export async function getNAmiibos(...ids: string[]) {
    await fillWithNAmiibos(...ids);
    return AMIIBO_DATABASE.filter(amiibo => ids.includes(`${amiibo.head}${amiibo.tail}`));
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
