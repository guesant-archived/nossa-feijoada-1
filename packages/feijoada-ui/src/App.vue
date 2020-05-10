<template>
  <div class="h-full" id="app">
    <div class="flex flex-col h-full min-h-screen bg-gray-900">
      <div>
        <Header />
      </div>
      <div class="flex-1 flex-shrink-0 flex flex-col">
        <router-view class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
export default {
  components: {
    Header,
  },
  async mounted() {
    await this.$store.dispatch('settings/loadOptions');
  },
};
</script>
