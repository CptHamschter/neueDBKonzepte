<template>
  <br>
  <div class="edit-post-container">
    <h2 class="edit-post-title">Nachricht bearbeiten</h2>
    <form @submit.prevent="updatePost" class="edit-post-form">
      <div class="form-group">
        <label for="title" class="form-label">Titel:</label>
        <input type="text" v-model="updatedPost.title" id="title" class="form-input">
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Inhalt:</label>
        <textarea v-model="updatedPost.content" id="content" class="form-textarea"></textarea>
      </div>
      <button type="submit" class="form-button">Aktualisieren</button>
      <p v-if="updateError" class="error-message">{{ updateError }}</p>
    </form>
  </div>
  <br>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NachrichtenBearbeiten',
  data() {
    return {
      postId: '',
      updatedPost: {
        title: '',
        content: ''
      },
      isUpdating: false,
      updateError: null
    };
  },
  mounted() {
    this.postId = this.$route.params.id;
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      if (!this.postId) {
        this.updateError = 'Post-ID fehlt.';
        return;
      }
      axios.get(`http://localhost:27017/api/posts/${this.postId}`)
        .then(response => {
          this.updatedPost = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen des Beitrags:', error);
          this.updateError = 'Fehler beim Laden des Beitrags.';
        });
    },
    updatePost() {
      if (!this.updatedPost.title.trim() || !this.updatedPost.content.trim()) {
        this.updateError = 'Titel und Inhalt sind Pflichtfelder.';
        return;
      }
      this.isUpdating = true;
      axios.put(`http://localhost:27017/api/posts/${this.postId}`, this.updatedPost, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
        .then(() => {
          alert('Beitrag erfolgreich aktualisiert!');
          this.isUpdating = false;
          // Weiterleitung zur Startseite
          this.$router.push('/startseite');
        })
        .catch(error => {
          // Fehlerbehandlung
          console.error('Fehler beim Aktualisieren des Beitrags:', error);
          this.updateError = 'Fehler beim Aktualisieren des Beitrags.';
          this.isUpdating = false;
        });
    }
  }
};
</script>

<style scoped>
.edit-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.edit-post-title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.edit-post-form {
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

.error-message {
  color: red;
  margin-top: 5px;
}
</style>
