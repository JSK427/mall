<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class=" tab-control-item"
      :class="{ active: index === currentIndex }" @click="itemclick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  z-index: 5;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding-bottom: 5px;
}

.active {

  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
