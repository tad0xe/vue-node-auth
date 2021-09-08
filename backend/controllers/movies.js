const MovieSchema = require("../models/Movie.js");
module.exports.controller = app => {
  // fetch all movies
  app.get("/movies", (req, res) => {
    MovieSchema.find(
      {},
      "name description release_year genre",
      (error, movies) => {
        if (error) {
          console.log(error);
        }
        res.send({
          movies
        });
      }
    );
  });
  // fetch a single movie
  app.get("/api/movies/:id", (req, res) => {
      console.log(res)
    MovieSchema.findById(
      req.params.id,
      "name description release_year genre",
      (error, movie) => {
        if (error) {
          console.error(error);
        }
        res.send(movie);
      }
    );
  });
  // rate a movie
  app.post("/movies/rate/:id", (req, res) => {
    const rating = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate
    });
    rating.save(function(error, rating) {
      if (error) {
        console.log(error);
      }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate
      });
    });
  });

  // add a new movie
  app.post("/movies", (req, res) => {
    const newMovie = new MovieSchema({
      name: req.body.name,
      description: req.body.description,
      release_year: req.body.release_year,
      genre: req.body.genre
    });
    newMovie.save((error, movie) => {
      if (error) {
        console.log(error);
      }
      res.send(movie);
    });
  });
};
