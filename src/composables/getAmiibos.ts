import { AmiiboContent } from "@/types/Amiibo";

export async function getAmiibos(query: string = "") {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo?name=${query}`);
    const json = await res.json() as {amiibo: AmiiboContent[]};
    return json.amiibo;
}
