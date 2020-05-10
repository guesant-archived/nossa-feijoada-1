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
      <template v-slot:list>
        <GalleryListItem class="h-full" v-for="i in responseData.docs" :key="i._id">
          <IGeneric :i="i" :username="getUsername(i.author)">
            <template v-slot:footer>
              <ITFooter :i="i" @set="setTemplate($event)" />
            </template>
          </IGeneric>
        </GalleryListItem>
      </template>
    </VGeneric>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import publicRequest from '@/shared/api/public-request';
import GalleryListItem from '@/components/GalleryListItem.vue';

import VGeneric from './VGeneric.vue'
import IGeneric from './IG.vue';
import ITFooter from './ITFooter.vue';

export default {
  data() {
    return {
      searchText: '',
      currentPage: 1,
      lastPage: 10,
      responseData: {
        docs: [],
        usernames: {}
      }
    }
  },
  components: {
    GalleryListItem,
    VGeneric,
    IGeneric,
    ITFooter
  },
  methods: {
    getUsername(author) {
      return this.responseData.usernames[author] || ''
    },
    async setTemplate(i) {
      console.log(i)
    },
    async fetchData(page) {
      return publicRequest('/templates', {
        params: {
          page,
          limit: 6,
          author: this.searchText,
          text: this.searchText,
          id: this.searchText,
        }
      }).then(res => {
        if (res.status === 200) {
          this.currentPage = res.data.page;
          this.lastPage = res.data.pages;
          this.responseData = res.data;
        } else {
          this.responseData = {
            docs: [],
            usernames: {}
          }
        }
      })
    },
    async fetchDataByText(text) {
      this.searchText = text;
      this.fetchData(this.currentPage)
    },
  },
  created() {
    this.loadData = debounce(async (page) => this.fetchData(page || this.currentPage), 250);
    this.loadDataByText = debounce(async (text) => this.fetchDataByText(text), 250)
  },
  async mounted() {
    await this.loadData();
  },
}
</script>
