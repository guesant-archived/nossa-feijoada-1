<template>
  <div class="max-h-screen" id="app">
    <Loading
      class="h-full w-full max-h-screen"
      :loading="appLoading"
      :loadingMessage="appLoadingMessage"
    >
      <div class="flex flex-col h-full min-h-screen bg-gray-900">
        <div>
          <Header />
        </div>
        <div class="flex-1 flex-shrink-0 flex flex-col">
          <router-view class="flex-1" />
        </div>
      </div>
    </Loading>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Loading from '@/components/Loading';
export default {
  components: {
    Header,
    Loading,
  },
  computed: {
    appLoading() {
      return this.$store.getters['shared/getOption']('appLoading');
    },
    appLoadingMessage() {
      return this.$store.getters['shared/getOption']('appLoadingMessage');
    },
  },
  async mounted() {
    await this.$store.dispatch('settings/loadOptions');
  },
};
</script>
