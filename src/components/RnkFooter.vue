<template>
  <footer>
    <p>Footer</p>
  </footer>
</template>

<script>
export default {
  name: "RnkFooter"
};
</script>

<style>
footer {
  background: #87f;
  padding: 25px 0;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;

  /* 
    Esse position relative e o top são para empurrar o footer um pouco mais
    para baixo provocando o scroll vertical
   */
  position: relative;
  top: 75px;
}
</style>
