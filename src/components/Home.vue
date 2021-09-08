<template>
<div>
    
     <v-layout row wrap>
    
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div class="headline">
            <v-btn flat v-bind:to="`/movies/${movie._id}`">{{ movie.name }}</v-btn>
          </div>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text">
              {{ movie.release_year }} ‧ {{
              movie.genre }}
            </span>
          </div>
        </v-card-title>
        <v-card-text>{{ movie.description }}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  
</div>
 
</template>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style><script>
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      movies: []
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/users/login");
    }
  },
  mounted() {
    axios
      .get("http://localhost:8081/movies", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        this.movies = response.data.movies;
      })
      .catch(() => {});
    this.fetchMovies();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/users/login');
    }
  }
};
</script>