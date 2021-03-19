const axios = require('axios')

const Url = 'https://movie-list.alphacamp.io/api/v1/movies/'
const imageUrl = 'https://movie-list.alphacamp.io/posters/'

function getMovie (bot, userId) {
  axios.get(Url).then(response => {
    const movies = []
    movies.push(...response.results)
    const movie = movies[Math.floor(Math.random() * movies.length)]
    const movieTitle = movie.title
    const movieDescription = movie.description
    const movieImage = imageUrl + movie.image
    bot.push(userId, `今日電影推薦: ${movieTitle}\n電影描述: ${movieDescription}\n電影海報: ${movieImage}`)
  })
}

module.exports = getMovie
