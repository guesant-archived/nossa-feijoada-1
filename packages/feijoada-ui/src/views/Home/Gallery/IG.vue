<template>
  <div class="h-full">
    <GalleryItem :img="{uri: (i.template||{}).base||'', alt: ''}">
      <template v-slot:body>
        <div class="p-2">
          <p class="font-bold">{{i.name}}</p>
          <p>{{username}}</p>
        </div>
      </template>
      <template v-slot:footer>
        <slot name="footer" />
      </template>
    </GalleryItem>
  </div>
</template>

<script>
import GalleryItem from '@/components/GalleryItem.vue';
export default {
  components: { GalleryItem },
  props: {
    i: Object,
    username: String
  }
}
</script>