<template>
  <div>
    <Gallery>
      <template v-slot:before>
        <slot name="header">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold uppercase">{{ headerTitle }}</h1>
            <div>
              <form @submit.prevent="$emit('search', searchText)">
                <div class="flex flex-row items-center justify-center">
                  <input
                    class="w-40 text-center text-white bg-transparent border-solid border-2 border-gray-800 px-2"
                    type="text"
                    :placeholder="headerSearchTitle"
                    v-model="searchText"
                  />
                  <button>Buscar</button>
                </div>
              </form>
            </div>
          </div>
        </slot>
      </template>

      <div class="flex flex-col">
        <slot name="main"></slot>
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
      }),
    },
  },
  components: {
    Gallery,
    GalleryList,
    GalleryPagination,
  },
  data() {
    return {
      searchText: '',
    };
  },
};
</script>
