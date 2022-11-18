<template>
    <div class="home col-8 mx-auto py-5 mt-5">
      <h1>Dashboard</h1>
      <div class="card">
        <div class="card-body" v-if="user">
          <h3>Hello, {{ user.name }}</h3>
          <span>{{ user.email }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import User from "../apis/User";

  export default {

    computed: {
        ...mapState ({
            user: state => state.auth.user
        })
    },
  
    mounted() {
      User.auth().then((response) => {
        this.$store.commit('AUTH_USER', response.data);
      }).catch(error => {
            if (error.response.status === 401) {
            //  this.$store.commit("LOGIN", false);
             // localStorage.removeItem("token");
             // this.$router.push({ name: "Login" });
            }
          });
      }
  };
  </script>
  