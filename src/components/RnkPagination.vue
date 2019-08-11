<template>
  <div class="pagination">
    <!-- Navigation buttons -->
    <button
      class="pagination_btn"
      v-if="showFirstLastButton"
      :disabled="isFirst"
      @click="selectPage(1)"
    >&lt;&lt;</button>
    <button
      class="pagination_btn"
      v-if="showNextPreviewsButton"
      :disabled="isFirst"
      @click="selectPage(currentPage-1)"
    >&lt;</button>

    <!-- Page links -->
    <ul class="pagination_list">
      <li
        class="pagination_list__item"
        :class="{ 'pagination_list__item--current' : page == currentPage }"
        v-for="page in totalShowedPages"
        :key="page"
        @click="selectPage(page)"
      >{{page}}</li>
    </ul>

    <!-- Navigation buttons -->
    <button
      class="pagination_btn"
      v-if="showNextPreviewsButton"
      :disabled="isLast"
      @click="selectPage(currentPage+1)"
    >&gt;</button>
    <button
      class="pagination_btn"
      v-if="showFirstLastButton"
      :disabled="isLast"
      @click="selectPage(totalPages)"
    >&gt;&gt;</button>
  </div>
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
    },
    showFirstLastButton: {
      type: Boolean,
      required: false,
      default: false
    },
    showNextPreviewsButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    totalPages() {
      return this.totalRecords == 0
        ? 0
        : Math.ceil(this.totalRecords / this.recordsPerPage);
    },
    totalShowedPages() {
      const totalShowedPages = [];
      const qtShowedPages = 10;
      const qtShowedPagesOffset = Math.ceil(qtShowedPages / 2);

      for (let i = 1; i <= this.totalPages; i++) {
        totalShowedPages.push(i);
      }

      totalShowedPages.splice(0, this.currentPage - qtShowedPagesOffset);
      totalShowedPages.splice(qtShowedPages, this.totalPages);

      return totalShowedPages;
    },
    isFirst() {
      return this.currentPage == 1;
    },
    isLast() {
      return this.currentPage == this.totalPages;
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
.pagination {
  text-align: center;
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.pagination_btn {
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 1px;
  border: 1px solid #87f;
  background: transparent;
  font-weight: bold;
}
.pagination_btn:hover {
  background: #87f;
  color: #fff;
}
.pagination_btn:disabled {
  cursor: not-allowed;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.3);
}
.pagination_btn:disabled:hover {
  background: transparent;
  color: rgba(0, 0, 0, 0.3);
}
.pagination_list {
  margin: 0 5px;
}
.pagination_list__item {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 1px;
  border: 1px solid #87f;
}
.pagination_list__item a {
  color: #87f;
}
.pagination_list__item:hover {
  background: #87f;
  color: #fff;
}
.pagination_list__item--current {
  background: #87f;
  color: #fff;
  font-weight: bold;
}
</style>
