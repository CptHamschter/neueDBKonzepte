<template>
  <div>
    <div class="news-box">
      <div class="news-thumbnail">
        <!-- Hier können Sie das Bild des Beitrags anzeigen -->
      </div>
      <div class="news-inhalt">
        <h2>{{ messageData.title }}</h2>
        <p>{{ messageData.description }}</p>
        <button @click="likePost">Like</button> <!-- Button zum Liken des Beitrags -->
        <br>
        <button @click="showCommentBox = !showCommentBox">Kommentar verfassen</button>
        <br>
        <textarea v-if="showCommentBox" v-model="newComment"></textarea>
        <br>
        <button v-if="showCommentBox" @click="addComment">Kommentar hinzufügen</button>
      </div>
      <div class="news-kommentare">
        <h3>Kommentare</h3>
        <ul>
          <li v-for="(comment, index) in messageData.comments" :key="index">
            {{ comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NachrichtenFeld',
  
  props: {
    postId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      messageData: {
        title: "",
        description: "",
        image: "",
        comments: []
      },
      showCommentBox: false,
      newComment: ''
    };
  },

  mounted() {
    this.fetchPostData(); // Beim Laden der Komponente die Daten des Beitrags abrufen
  },

  methods: {
    async fetchPostData() {
      try {
        const response = await axios.get(`http://localhost:27017/api/posts/${this.postId}`);
        this.messageData = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Beitragsdaten:', error);
      }
    },

    async likePost() {
      try {
        await axios.post(`http://localhost:27017/api/posts/${this.postId}/like`);
        // Aktualisieren Sie die Beitragsdaten, um den aktualisierten Like-Status anzuzeigen
        this.fetchPostData();
      } catch (error) {
        console.error('Fehler beim Liken des Beitrags:', error);
      }
    },

    async addComment() {
      try {
        await axios.post(`http://localhost:27017/api/posts/${this.postId}/comment`, {
          comment: this.newComment
        });
        // Aktualisieren Sie die Beitragsdaten, um den neuen Kommentar anzuzeigen
        this.fetchPostData();
        this.newComment = ''; // Zurücksetzen des Kommentartexts nach dem Hinzufügen
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Kommentars:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Ihr CSS-Styling */
</style>
