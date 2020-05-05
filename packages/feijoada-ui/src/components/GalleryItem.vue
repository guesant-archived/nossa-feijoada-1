<template>
  <div>
    <div>
      <div class="p-2">
        <img class="h-24 md:h-32 w-full object-cover" :src="img.uri" :alt="img.alt" />
      </div>
    </div>
    <div class="p-2">
      <slot name="body" />
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
