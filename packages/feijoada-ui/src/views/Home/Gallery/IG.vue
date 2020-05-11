<template>
  <div class="h-full">
    <GalleryItem :img="{ uri: image, alt: '' }">
      <template v-slot:body>
        <div class="p-2">
          <p class="font-bold">
            <router-link :to="{ name: itemRoute, params: { id: i._id } }">{{
              i.name
            }}</router-link>
          </p>
          <p>
            <router-link
              :to="{ name: 'user-explore', params: { id: i.author.username } }"
            >
              {{ i.author.username }}
            </router-link>
          </p>
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
    image: String,
    itemRoute: String,
  },
};
</script>
