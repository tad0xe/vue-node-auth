<template>
 <v-layout row wrap>
 <v-flex xs4>
 <v-card>
 <v-card-title primary-title>
 <div>
 <div class="headline">{{ movie.name }}</div>
 <span class="grey--text">{{ movie.release_year }} ‧ {{
movie.genre }}</span>
 </div>
 </v-card-title>
 <h6 class="card-title">Rate this movie</h6>
 <v-card-text>
 {{ movie.description }}
 </v-card-text>
 </v-card>
 </v-flex>
 </v-layout>
</template>
<script>
import axios from "axios";
import Vue from 'vue';

import StarRating from "vue-star-rating";
const wrapper = document.createElement("div");
// shared state
const state = {
  note: 0
};
// crate component to content
const RatingComponent = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) {
      state.note = newVal;
    }
  },
  template: `
 <div class="rating">
 How was your experience getting help with this issues?
 <star-rating v-model="rating" :show-rating="false"></star-rating>
 </div>`,
  components: { "star-rating": StarRating }
});
const component = new RatingComponent().$mount(wrapper);

export default {
  name: "Movie",
  data() {
    return {
      movie: []
    };
  },
  
  
  mounted() {
    axios
      .get(`http://localhost:8081/api/movies/${this.$route.params.id}`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        this.movie = response.data;
      })
      .catch(() => {});
    this.fetchMovies();
  },
};
</script>