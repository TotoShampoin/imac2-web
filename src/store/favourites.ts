import { defineStore } from "pinia";
import { ref } from "vue";


export const useFavourites = defineStore("favourites", () => {
    const favourites = ref<string[]>(
        JSON.parse(localStorage.getItem('favourites') || '[]') as string[]);

    function updateFavourites() {
        localStorage.setItem('favourites', JSON.stringify(favourites.value));
    }

    function isFavourite(id: string) {
        return favourites.value.includes(id);
    }
    function addFavourite(id: string) {
        favourites.value.push(id);
        updateFavourites();
    }
    function removeFavourite(id: string) {
        favourites.value = favourites.value.filter(favourite => favourite !== id);
        updateFavourites();
    }

    return {
        favourites,
        isFavourite,
        addFavourite,
        removeFavourite
    };
});
