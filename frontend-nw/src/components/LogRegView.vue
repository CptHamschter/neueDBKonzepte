<template>
    <div class="body">
      <div class="container" id="container" :class="{'right-panel-active': isRightPanelActive}">
        <RegisterForm/>
        <LoginForm/>
        <OverlayComponent @toggle="toggleOverlay" />
      </div>
    </div>
    </template>
    
    <script>
    import RegisterForm from './signinPage.vue';
    import LoginForm from './loginPage.vue';
    import OverlayComponent from './overlay.vue';
    
    export default {
    name: 'LogRegView',
    components: {
      RegisterForm,
      LoginForm,
      OverlayComponent
    },
    data() {
      return {
        isRightPanelActive: false,
      };
    },
    methods: {
      toggleOverlay() {
        this.isRightPanelActive = !this.isRightPanelActive; // Kehrt den Zustand um
      }
    },
        created() {
            if (JSON.parse(sessionStorage.getItem('Kunde')))
            {
                if (JSON.parse(sessionStorage.getItem('Kunde')).Reg) {
                    window.location.replace('/profile')
                }
            }
        }
    };
    </script>
    
    <style scoped>
      
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
    
    * {
    box-sizing: border-box;
    }
    
    .body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    width:auto;
    margin: auto;
    background-image: url('../assets/NachrichtenpageBackground.jpg');
    background-size: cover;
    backdrop-filter: blur(5px);
    }
    
    /* Spezifikation und Animationen für Anmeldung und Sign Up - siehe Animationen zusätzlich bei vanilla JS Code */
    .container {
    background-color: #fff;
    border-radius: 0.625em;
    box-shadow: 0 0.875em 1.75em rgba(0, 0, 0, 0.25), 0 0.625em 0.625em rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 49em;
    max-width: 100%;
    min-height: 30em;
    }
    
    /* Übergang des Registrierungs-Container - translateX(100) -> Rechte Seite des containers (sobald aktiv)*/
    
    .container.right-panel-active .registrierungs-container {
    transform: translateX(100%);
    opacity: 1; /* sichtbar machen*/
    z-index: 5; /* jetzt überhalb des anmelde containers */
    animation: show 0.6s;
    }
    
    @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1; /* erste Teil der Animation noch versteckt */
    }
    
    50%, 100% {
      opacity: 1;
      z-index: 5; /* voll sichtbar */
    }
    }
    
    
    .container.right-panel-active .overlay-container{
    transform: translateX(-100%); /* bewegt sich auf linke Seite des Containers */
    }
    
    .container.right-panel-active .overlay {
    transform: translateX(50%); /* container bewegt sich wieder nach rechts */
    }
    
    .container.right-panel-active .overlay-left { /* sobald right-panel-active, translateX(0) -> voll sichtbar*/
    transform: translateX(0);
    }
    
    .container.right-panel-active .overlay-right {
    transform: translateX(20%);
    }
    
    
    @media (max-width: 790px) {
      body {
          width: 100%;
          height: auto;
          min-height: 100vh; 
          background-size: cover; 
          background-position: center; 
      }
    
      .container {
          width: 100%; 
          min-height: auto; 
          flex-direction: column; 
      }
    
    .container.right-panel-active .registrierungs-container,
      .container.right-panel-active .anmelde-container {
          transform: none;
          opacity: 1;
          position: relative;
          z-index: 1;
      }
    
    }
    </style>
    