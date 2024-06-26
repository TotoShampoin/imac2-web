import { defineStore } from "pinia";
import { ref } from "vue";


export const useAmiiboDatabase = defineStore("amiibos", () => {
    const AMIIBO_DATABASE = ref<AmiiboType[]>([]);
    const is_loading = ref(false);
    let is_filled = false;

    async function fetchAllAmiibos() {
        const res = await fetch(`https://www.amiiboapi.com/api/amiibo`);
        const json = await res.json() as {amiibo: AmiiboType[]};
        return json.amiibo;
    }
    async function fetchOneAmiibo(id: string) {
        try {
            const res = await fetch(`https://www.amiiboapi.com/api/amiibo?id=${id}`);
            const json = await res.json() as {amiibo: AmiiboType};
            return json.amiibo;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    async function fillWithAllAmiibos() {
        if(is_filled) return;
        is_loading.value = true;
        AMIIBO_DATABASE.value = await fetchAllAmiibos();
        is_filled = true;
        is_loading.value = false;
    }
    async function fillWithOneAmiibo(id: string) {
        if(is_filled) return;
        is_loading.value = true;
        const amiibo = await fetchOneAmiibo(id);
        AMIIBO_DATABASE.value = amiibo ? [amiibo] : [];
        is_loading.value = false;
    }
    async function fillWithNAmiibos(...ids: string[]) {
        if(is_filled) return;
        is_loading.value = true;
        AMIIBO_DATABASE.value = await Promise.all(ids
            .map(id => fetchOneAmiibo(id))
            .filter(x => x !== null) as Promise<AmiiboType>[]
        );
        is_loading.value = false;
    }
    
    return {
        AMIIBO_DATABASE,
        is_loading,
        fillWithAllAmiibos,
        fillWithNAmiibos,
        fillWithOneAmiibo
    };
});

export function getAmiiboDate(amiibo: AmiiboType, region: "au" | "eu" | "jp" | "na" | undefined = undefined): Date {
    if(region && amiibo.release[region]) return new Date(amiibo.release[region]);
    else if(amiibo.release.na) return new Date(amiibo.release.na);
    else if(amiibo.release.eu) return new Date(amiibo.release.eu);
    else if(amiibo.release.au) return new Date(amiibo.release.au);
    else if(amiibo.release.jp) return new Date(amiibo.release.jp);
    else return new Date(0);
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
