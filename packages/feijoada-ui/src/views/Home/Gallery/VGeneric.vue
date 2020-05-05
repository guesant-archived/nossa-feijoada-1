<template>
  <div>
    <Gallery>
      <template v-slot:before>
        <slot name="header">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold uppercase">{{headerTitle}}</h1>
            <div>
              <form @submit.prevent="$emit('search', searchText)">
                <input
                  class="text-black"
                  type="text"
                  :placeholder="headerSearchTitle"
                  v-model="searchText"
                />
                <button>Buscar</button>
              </form>
            </div>
          </div>
        </slot>
      </template>

      <div>
        <GalleryList>
          <slot name="list" />
        </GalleryList>
      </div>

      <template v-slot:wrap>
        <GalleryPagination
          :currentPage="currentPage"
          :totalPages="lastPage"
          @input="$emit('pagination', $event)"
        />
      </template>
    </Gallery>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue';
import GalleryList from '@/components/GalleryList.vue';
import GalleryPagination from '@/components/GalleryPagination.vue';

export default {
  props: {
    headerTitle: String,
    headerSearchTitle: String,
    currentPage: { type: Number },
    lastPage: { type: Number },
    responseData: {
      type: Object,
      default: () => ({
        docs: [],
        usernames: {}
      })
    },
  },
  components: {
    Gallery,
    GalleryList,
    GalleryPagination
  },
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    getUsername(author) {
      return this.responseData.usernames[author] || ''
    }
  },
}
</script>
