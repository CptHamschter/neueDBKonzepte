<template>
  <div>
    <h2>Neuen Post erstellen</h2>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">Titel</label>
        <input type="text" id="title" v-model="post.title" required>
      </div>
      <div>
        <label for="content">Inhalt</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <button type="submit">Post erstellen</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await axios.post('http://localhost:27017/api/posts/post-erstellen', this.post, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        });
        if (response.status === 201) {
          this.$router.push('/'); // Zur Hauptseite oder einer Bestätigungsseite navigieren
          console.log('Post erfolgreich erstellt:', response.data);
        } else {
          console.error('Fehler beim Erstellen des Posts:', response.data);
        }
      } catch (error) {
        console.error('Fehler:', error.response.data);
      }
    }
  }
}
</script>
