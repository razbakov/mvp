<template>

  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title>
          Meetup Chat
        </q-toolbar-title>
        <q-btn v-if="user" color="primary" @click="signOut">Sign Out ({{ user.displayName }})</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="">
        <q-list bordered separator padding>
          <q-item v-for="message in messages" :key="message.id">
            <q-item-section top avatar>
              <q-avatar>
                <img :src="message.authorPhoto" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ message.authorName }}</q-item-label>
              <q-item-label caption>{{ message.body }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>{{ formatDate(message.date) }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-page>
    </q-page-container>

    <q-footer class="q-pa-md bg-white">

      <q-btn v-if="!user" color="primary" @click="signInWithGoogle">Sign In to chat</q-btn>
      <q-input v-else placeholder="Write a message" v-model="message" @keyup.enter="send" />
    </q-footer>
  </q-layout>
</template>

<script>
import * as Firebase from "firebase/app";
import { date } from 'quasar';

export default {
  name: 'PageIndex',
  data: () => ({
    message: ''
  }),
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
    user() {
      return this.$store.state.auth.user;
    },
    messages() {
      return this.$store.state.chat.data;
    }
  },
  methods: {
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
    },
    signInWithGoogle() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      Firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      Firebase.auth().signOut();
    },
    send() {
      const message = this.message;

      this.$store.dispatch("chat/insert", {
        date: +new Date(),
        body: message,
        authorName: this.user.displayName,
        authorPhoto: this.user.photoURL,
      });

      this.message = '';
    }
  },
}
</script>
