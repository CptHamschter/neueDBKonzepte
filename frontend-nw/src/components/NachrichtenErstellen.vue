<template>
  <div>
    <h1>Nachricht erstellen</h1>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Titel:</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div>
        <label for="content">Inhalt:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div>
        <button type="submit">Nachricht erstellen</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NachrichtenErstellen",
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    submitPost() {
      // POST-Anfrage an den Backend-Endpunkt senden
      axios.post('http://localhost:27017/api/posts/post-erstellen', {
        title: this.title,
        content: this.content
      })
      .then(response => {
        console.log('Nachricht erfolgreich erstellt:', response.data);
        // Nachricht wurde erfolgreich erstellt, rufe die Beiträge erneut ab
        this.$emit('postCreated'); // Emit an event to notify parent component
      })
      .catch(error => {
        console.error('Fehler beim Erstellen der Nachricht:', error);
        // Hier kannst du eine Fehlermeldung anzeigen
      });
    }
  }
};
</script>
