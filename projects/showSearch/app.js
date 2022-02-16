const form = document.querySelector('#searchForm');
const formInput = document.querySelector('#searchInput');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearShows(document.querySelectorAll('img'));
    const searchTerm = formInput.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    formInput.value = '';
    const shows = res.data;
    makeShows(shows);
})

function makeShows(shows) {
    for (let show of shows) {
        if (show.show.image.medium) {
            const newShow = document.createElement('img');
            newShow.src = show.show.image.medium;
            document.body.appendChild(newShow);
        }
    }
}

function clearShows(shows) {
    for (let show of shows) {
        document.body.removeChild(show);
    }
}