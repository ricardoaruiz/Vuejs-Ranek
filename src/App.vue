<template>
  <div id="app">
    <RnkHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <RnkFooter />
  </div>
</template>

<script>
import RnkHeader from "@/components/RnkHeader.vue";
import RnkFooter from "@/components/RnkFooter.vue";

export default {
  name: "App",
  components: {
    RnkHeader,
    RnkFooter
  }
};
</script>


<style>
/* Reset */
* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

/* Estilo geral do body e elementos básicos */
body {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

label {
  margin-bottom: 5px;
}

/* Imagens responsivas */
img {
  max-width: 100%;
  display: block;
}

/* Estilo geral para os botões da aplicação */
.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

/* Configuração do layout geral deixando o footer sempre no bottom da tela */
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
/* O main é onde serão renderizadas as páginas e ele se expande ao máximo
   deixando o footer no fim da pagina
 */
#main {
  flex: 1;
}
input,
textarea {
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir" Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}
input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

/* 
  Estilo geral de transição
  Entra de cima para baixo e sai para baixo iniciando
  com opacidade 0 indo para 1 e voltando para 0
 */
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
</style>
