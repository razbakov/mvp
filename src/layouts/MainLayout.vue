<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>
        <q-btn v-if="!user" color="primary" @click="signInWithGoogle">Sign In</q-btn>
        <q-btn v-if="user" color="primary" @click="signOut">Sign Out ({{ user.displayName }})</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import * as Firebase from "firebase/app";

export default {
  name: 'MainLayout',
  methods: {
    signInWithGoogle() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      Firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      Firebase.auth().signOut();
    }
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
    user() {
      return this.$store.state.auth.user;
    }
  },
}
</script>
