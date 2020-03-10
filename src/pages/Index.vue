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
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { date } from "quasar";

const firebaseConfig = {
  apiKey: "AIzaSyBDImn6-YKP4m_GNbvVCaRQKFhn4Mq-w8o",
  authDomain: "mvp-chat-58ef6.firebaseapp.com",
  databaseURL: "https://mvp-chat-58ef6.firebaseio.com",
  projectId: "mvp-chat-58ef6",
  storageBucket: "mvp-chat-58ef6.appspot.com",
  messagingSenderId: "271411937408",
  appId: "1:271411937408:web:ab8557ed64b544ec976665",
  measurementId: "G-SHEGL7J0G4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const chatCollection = db.collection("chat");

export default {
  name: 'PageIndex',
  data: () => ({
    message: '',
    user: null,
    messages: {}
  }),
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });

    chatCollection.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
              Vue.set(this.messages, change.doc.id, change.doc.data());
          }
          if (change.type === "modified") {
              Vue.set(this.messages, change.doc.id, change.doc.data());
          }
          if (change.type === "removed") {
              Vue.delete(this.messages, change.doc.id);
          }
      });
    });
  },
  methods: {
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase.auth().signOut();
    },
    send() {
      const message = this.message;

      chatCollection.add({
        date: +new Date(),
        body: message,
        authorName: this.user.displayName,
        authorPhoto: this.user.photoURL,
      })

      this.message = '';
    }
  },
}
</script>
