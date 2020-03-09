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
    });

    this.$store
      .dispatch("chat/openDBChannel")
      .catch(console.error);
  }
}
</script>
