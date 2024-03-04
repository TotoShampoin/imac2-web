export function getFavourites() : string[] {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
}

export function isFavourite(id: string) : boolean {
    return getFavourites().includes(id);
}

export function addFavourite(id: string) : void {
    const favourites = getFavourites();
    favourites.push(id);
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

export function removeFavourite(id: string) : void {
    const favourites = getFavourites().filter(favourite => favourite !== id);
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
