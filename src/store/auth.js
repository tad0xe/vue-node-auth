import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {},
  actions: {
    async login({}) {
      let user = {
        email: this.email,
        password: this.password
      };
      axios.post("http://localhost:8081/login", user).then(
        res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        err => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    }
  }
};
