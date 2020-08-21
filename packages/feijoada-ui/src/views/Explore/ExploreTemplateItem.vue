<template>
  <div class="text-white">
    <div class="container max-w-4xl mx-auto p-4">
      <div v-if="responseData._id">
        <div>
          <p>
            ID: <span>{{ responseData._id }}</span>
          </p>
          <p>
            Nome: <span>{{ responseData.name }}</span>
          </p>
          <p>
            Remetente:
            <router-link
              :to="{
                name: 'user-explore',
                params: { id: responseData.author.username },
              }"
            >
              {{ responseData.author.username }}
            </router-link>
          </p>

          <p>
            Enviado:
            <span>{{
              new Date(responseData.createdAt).toLocaleString('pt-BR') ||
                new Date(responseData.createdAt)
            }}</span>
          </p>
        </div>
        <div class="mt-2 w-56">
          <img
            :src="getBaseImage(responseData)"
            alt="Imagem principal do template"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicRequest from '../../shared/api/public-request';
import resolveGalleryUrl from '../../shared/resolve-gallery-url';

export default {
  data() {
    return {
      responseData: {},
      message: '',
    };
  },
  methods: {
    async getTemplateInfo() {
      publicRequest(`/templates/${this.$route.params.id}`)
        .then((res) => {
          this.responseData = res.data;
        })
        .catch(() => {
          this.message = 'Não foi possivel obter informações sobre o template.';
        });
    },
    getBaseImage(i) {
      if (!i.template && !i.template.base) return;
      return resolveGalleryUrl(i.template.base);
    },
  },
  async mounted() {
    await this.getTemplateInfo();
  },
};
</script>
