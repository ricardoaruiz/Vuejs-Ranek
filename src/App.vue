<template>
  <div id="app">
    <RnkHeader />
    <main id="main">
      <router-view />
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
</style>
