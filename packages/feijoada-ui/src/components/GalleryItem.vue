<template>
  <div class="flex flex-col h-full">
    <div>
      <div class="p-2">
        <img class="h-24 md:h-32 w-full object-cover" :src="img.uri" :alt="img.alt" />
      </div>
    </div>
    <div class="flex-1">
      <slot name="body" />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: { type: Object },
  }
}
</script>
