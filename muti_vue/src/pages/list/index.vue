<template>
  <div>
    <p class="list">List Page</p>
    <span>{{count}}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['count'])
  },
};
</script>
<style lang="scss">
.list {
  font-size: 24px;
  color: $titleColor;
}
</style>
