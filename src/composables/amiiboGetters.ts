// import { AmiiboContent } from "@/types/Amiibo";

export async function getAmiibos(query: string = "") {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo?name=${query}`);
    const json = await res.json() as {amiibo: AmiiboContent[]};
    return json.amiibo;
}

export async function getOneAmiibo(id: string) {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo?id=${id}`);
    const json = await res.json() as {amiibo: AmiiboContent[]};
    return json.amiibo;
}




export type AmiiboContent = {
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
