const API_KEY = "aa17e2b78a35ef77db2729c4af17c5c2";
//https://api.themoviedb.org/3

const categories = [
    {
        name: "trending",
        title: "Em alta",
        path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
        isLarge: true
    },
    {
        name: "netflixOriginals",
        title: "Originais",
        path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
        isLarge: false
    },
    {
        name: "topRated",
        title: "Populares",
        path: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
        isLarge: false
    },
    {
        name: "comedy",
        title: "Comedias",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
        isLarge: false
    },
    {
        name: "romance",
        title: "Romances",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
        isLarge: false
    },
    {
        name: "documentaries",
        title: "Documentarios",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
        isLarge: false
    },

];

//metodo para pegar os filmes 
export const getMovies = async (path) => {
    try {
        let url = `https://api.themoviedb.org/3${path}`;
        const response = await fetch(url); //fazer um fetch na url aguardando uma resposta
        return await response.json(); //devolver o json recebido

    } catch (error){
        console.log("error getMovies: ", error);
    }
};

export default categories;
