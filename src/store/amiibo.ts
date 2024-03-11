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
        const res = await fetch(`https://www.amiiboapi.com/api/amiibo?id=${id}`);
        const json = await res.json() as {amiibo: AmiiboType};
        return json.amiibo;
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
        AMIIBO_DATABASE.value = [await fetchOneAmiibo(id)];
        is_loading.value = false;
    }
    async function fillWithNAmiibos(...ids: string[]) {
        if(is_filled) return;
        is_loading.value = true;
        AMIIBO_DATABASE.value = await Promise.all(ids.map(id => fetchOneAmiibo(id)));
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
