<template>
  <div :class="loading ? ' overflow-hidden' : ' overflow-auto'">
    <div class="relative">
      <div class="fixed inset-0 bg-gray-100 bg-opacity-25" v-show="loading">
        <div class="h-full w-full flex items-center justify-center">
          <p class="text-white">{{ loadingMessage }}</p>
        </div>
      </div>
      <div :class="loading && 'pointer-events-none'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
    loadingMessage: { type: String, default: '' },
  },
};
</script>
