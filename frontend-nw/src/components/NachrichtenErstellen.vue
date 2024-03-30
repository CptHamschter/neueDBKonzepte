<template>
  <br>
  <div class="create-post-container">
    <h2 class="create-post-title">Neuen Post erstellen</h2>
    <form @submit.prevent="createPost" class="create-post-form">
      <div class="form-group">
        <label for="title" class="form-label">Titel</label>
        <input type="text" id="title" v-model="post.title" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Inhalt</label>
        <textarea id="content" v-model="post.content" class="form-textarea" required></textarea>
      </div>
      <button type="submit" class="form-button">Post erstellen</button>
    </form>
  </div>
  <br>
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
          this.$router.push('/startseite'); // Zur Hauptseite oder einer Bestätigungsseite navigieren
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

<style scoped>
.create-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.create-post-title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.create-post-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 18px;
  margin-bottom: 5px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-textarea {
  resize: vertical;
}

.form-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>
