<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import * as Firebase from "firebase/app";

export default {
  name: 'App',
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.$store.commit("auth/setUser", user);
      if (user) {
        
      } else {
        this.$router.replace("/");
      }
    });
  }
}
</script>
