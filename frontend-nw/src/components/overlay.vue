<template>
    <div class="overlay-container">
      <div class="overlay">
      
        <div class="overlay-panel overlay-left">
            <h1>Willkommen zurück!</h1>
            <p>Um mit uns in Kontakt zu bleiben, melde dich bitte mit deinen persönlichen Zugangsdaten an</p>
            <button class="ghost" id="signIn" @click="toggle">Anmelden</button>
        </div>
        <div class="overlay-panel overlay-right">
            <h1>Neu hier?</h1>
            <p>Gib deine persönlichen Daten ein und beginne deine Reise mit uns</p>
            <button class="ghost" id="signUp" @click="toggle">Registrieren</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
  name: 'OverlayComponent',
  methods: {
    toggle() {
      this.$emit('toggle'); 
    }
  }
}
</script>

<style scoped>

h1 {
font-weight: bold;
margin: 0;
}

p {
font-size: 0.875em;
font-weight: 100;
line-height: 1.25em;
letter-spacing: 0.03125em;
margin: 1.25em 0 1.875em;
}


button {
border-radius: 1.8em;
border: 0.04em solid black;
background-color: black;
color: #FFFFFF;
font-size: 0.8em;
font-weight: bold;
padding: 0.87em 2.8125em;
letter-spacing: 0.03125em;
text-transform: uppercase;
transition: transform 80ms ease-in;
}

button:active {
transform: scale(0.95);
}

button:focus {
outline: none;
}

button.ghost {
background-color: transparent;
border-color: #FFFFFF;
}
@keyframes show {
0%, 49.99% {
  opacity: 0;
  z-index: 1; 
}

50%, 100% {
  opacity: 1;
  z-index: 5; 
}
}


.overlay-container { 
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100; 
}

.container.right-panel-active .overlay-container{
transform: translateX(-100%); 
}

.overlay { 
background: black;
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #FFFFFF;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
transform: translateX(50%); 
}

.overlay-panel { 
position: absolute;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;
top: 0;
height: 100%;
width: 50%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

.overlay-left {
transform: translateX(-20%); 
}

.container.right-panel-active .overlay-left { 
transform: translateX(0);
}

.overlay-right {
right: 0; 
transform: translateX(0);
}

.container.right-panel-active .overlay-right {
transform: translateX(20%);
}
select {
  background-color: #eee;
  border: none;
  padding: 0.75em 0.9375em;
  margin: 0.5em 0;
  width: 100%;
  font-family: 'Montserrat', sans-serif; 
  box-sizing: border-box; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none; 
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 15px;
  top: calc(50% - 0.5em); 
  pointer-events: none; 
}
@media (max-width: 790px) {

  .form-container, .overlay-container {
      width: 100%; 
      position: relative; 
  }
  .overlay {
      display: none; 
  }

}
</style>