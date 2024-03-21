<template> 
<h1> Hallo Herzlichen Willkommen auf unserer Nachrichtenseite </h1>

<div class="Eventhinzufügen">
    <button> News hinzufügen</button>

</div>

<NachrichtenFeld/>


    </template>

<script>
 import NachrichtenFeld from '@/components/Nachrichten.vue'

 export default {
    name: 'HauptSeite',

    components: {
        NachrichtenFeld
  }
 }

</script>