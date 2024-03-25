import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchSession = defineStore("searchSession", () => {

    function resetSearches() {
        sessionStorage.removeItem('searches');
    }
    
    function saveSearches(data: any) {
        sessionStorage.setItem('searches', JSON.stringify(data));
    }

    function loadSearches() {
        return JSON.parse(sessionStorage.getItem('searches') || '{}');
    }

    return {
        resetSearches,
        saveSearches,
        loadSearches
    };
});
