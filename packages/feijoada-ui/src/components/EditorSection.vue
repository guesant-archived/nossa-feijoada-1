<template>
  <div class="p-4 bg-gray-800">
    <slot name="header">
      <h2 class="text-lg font-bold">{{title}}</h2>
    </slot>
    <div>
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>
