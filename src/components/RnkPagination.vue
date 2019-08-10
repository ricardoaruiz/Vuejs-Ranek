<template>
  <ul>
    <li
      v-for="page in totalPages"
      :key="page"
      @click="selectPage(page)"
      :class="{ 'current_page' : page == currentPage }"
    >{{page}}</li>
  </ul>
</template>

<script>
export default {
  name: "RnkPagination",
  props: {
    totalRecords: {
      type: Number,
      default: 0
    },
    recordsPerPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages() {
      return this.totalRecords == 0
        ? 0
        : Math.ceil(this.totalRecords / this.recordsPerPage);
    }
  },
  methods: {
    selectPage(page) {
      if (this.currentPage != page) this.$emit("onSelectPage", page);
    }
  }
};
</script>

<style scoped>
ul {
  text-align: center;
  margin-top: 40px;
}
li {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 2px;
  border: 1px solid #87f;
}
li a {
  color: #87f;
}
li:hover {
  background: #87f;
  color: #fff;
}
.current_page {
  background: #87f;
  color: #fff;
  font-weight: bold;
}
</style>
