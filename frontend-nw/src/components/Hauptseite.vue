<template> 
    <div>
      <h1>Hallo und herzlich willkommen auf unserer Nachrichtenseite</h1>
  
      <div class="Eventhinzufügen">
        <button @click="navigateToCreateNews">News hinzufügen</button>
      </div>
      <br>
      <br>
      <NachrichtenFeld/>
    </div>
  </template>
  
  <script>
  import NachrichtenFeld from '@/components/Nachrichten.vue'
  
  export default {
    name: 'HauptSeite',
  
    components: {
      NachrichtenFeld
    },
  
    methods: {
      navigateToCreateNews() {
        this.$router.push('/nachrichten');
      }
    }
  }
  </script>
  