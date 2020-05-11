<template>
  <div>
    <VGeneric
      headerTitle="Selecione um template"
      headerSearchTitle="Pesquisar template (remetente, texto, id)"
      :currentPage="currentPage"
      :lastPage="lastPage"
      :reponseData="responseData"
      @pagination="loadData($event)"
      @search="loadDataByText($event)"
    >
      <template v-slot:list v-if="responseData.status === 200">
        <GalleryListItem
          class="h-full"
          v-for="i in responseData.docs"
          :key="i._id"
        >
          <IGeneric
            :i="i"
            :image="previewUrl(i)"
            itemRoute="explore-template-item"
          >
            <template v-slot:footer>
              <ITFooter :i="i" @set="setTemplate($event)" />
            </template>
          </IGeneric>
        </GalleryListItem>
      </template>
      <template v-slot:main>
        <div class="text-center">
          <div v-if="responseData.status === 200"></div>
          <div v-else-if="typeof responseData.status === 'number'">
            Não foi possível fazer a busca. Código: {{ responseData.status }}
          </div>
          <div v-else>
            <p>Não foi possivel conectar ao servidor.</p>
          </div>
        </div>
      </template>
    </VGeneric>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import publicRequest from '@/shared/api/public-request';
import GalleryListItem from '@/components/GalleryListItem.vue';
import resolveGalleryUrl from '@/shared/resolve-gallery-url';

import VGeneric from './VGeneric.vue';
import IGeneric from './IG.vue';
import ITFooter from './ITFooter.vue';

export default {
  data() {
    return {
      searchText: '',
      currentPage: 1,
      lastPage: 1,
      responseData: {
        status: 200,
        docs: [],
      },
    };
  },
  components: {
    GalleryListItem,
    VGeneric,
    IGeneric,
    ITFooter,
  },
  methods: {
    async setTemplate(i) {
      this.$store.dispatch('generator/changeTemplate', i);
    },
    async fetchData(page) {
      return publicRequest('/templates', {
        params: {
          page,
          limit: 6,
          author: this.searchText,
          text: this.searchText,
          id: this.searchText,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            this.currentPage = res.data.page;
            this.lastPage = res.data.pages;
            this.responseData.docs = res.data.docs;
            this.responseData.status = res.status;
          } else {
            this.responseData = {
              docs: [],
            };
          }

          this.responseData.status = res.status;
        })
        .catch(() => {
          this.responseData.status = 'ue';
        });
    },
    async fetchDataByText(text) {
      this.searchText = text;
      this.fetchData(this.currentPage);
    },
    previewUrl(i) {
      if (!i.template || !i.template.base) return;
      return resolveGalleryUrl(i.template.base);
    },
  },
  created() {
    this.loadData = debounce(
      async (page) => this.fetchData(page || this.currentPage),
      250,
    );
    this.loadDataByText = debounce(
      async (text) => this.fetchDataByText(text),
      250,
    );
  },
  async mounted() {
    await this.loadData();
  },
};
</script>
