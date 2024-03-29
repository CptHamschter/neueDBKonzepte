<template>
  <div v-if="userRole === 'journalist'">
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
  <div v-else>
    <p>Du hast keine Berechtigung, Beiträge zu erstellen.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NachrichtenErstellen",
  data() {
    return {
      title: '',
      content: '',
      userRole: '' // Benutzerrolle speichern
    };
  },
  methods: {
    async getUserRole() {
      try {
        const response = await axios.get('http://localhost:27017/api/auth/user-role');
        this.userRole = response.data.role; // Benutzerrolle abrufen und speichern
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerrolle:', error);
      }
    },
    async submitPost() {
      // Überprüfen, ob der Benutzer die Rolle eines Journalisten hat
      if (this.userRole === 'journalist') {
        try {
          // POST-Anfrage an den Backend-Endpunkt senden
          const response = await axios.post('http://localhost:27017/api/posts/post-erstellen', {
            title: this.title,
            content: this.content
          });
          console.log('Nachricht erfolgreich erstellt:', response.data);
          // Nachricht wurde erfolgreich erstellt, rufe die Beiträge erneut ab
          this.$emit('postCreated'); // Emit an event to notify parent component
        } catch (error) {
          console.error('Fehler beim Erstellen der Nachricht:', error);
          // Hier kannst du eine Fehlermeldung anzeigen
        }
      } else {
        console.log('Du hast keine Berechtigung, Beiträge zu erstellen.');
        // Hier kannst du eine Meldung anzeigen, dass der Benutzer keine Berechtigung hat
      }
    }
  },
  mounted() {
    this.getUserRole(); // Beim Laden der Komponente die Benutzerrolle abrufen
  }
};
</script>
