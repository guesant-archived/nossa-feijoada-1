<template>
  <div class="text-white">
    <div class="py-16">
      <div
        class="container mx-auto max-w-xl w-full border-gray-700 border-t-2 border-b-2"
      >
        <EditorSketch
          :template="template"
          @changeOption="setOption($event.to, $event.key, $event.value)"
          @reset="reset"
        />
        <EditorExport
          class="border-gray-700 border-t-2"
          :templateDoc="templateDoc"
          :template="template"
          @changeOption="setOption($event.to, $event.key, $event.value)"
          @reset="reset"
          @publish="publish"
        />

        <EditorRender
          class="border-gray-700 border-t-2"
          :preview="preview"
          @render="reset"
          @changeOption="setOption($event.to, $event.key, $event.value)"
        />
      </div>
      <div class="container mx-auto max-w-xl w-full mt-2">
        <EditorSources
          :fabric="fabric"
          :template="template"
          @sourceAdd="addSource($event)"
          @sourceRemove="removeSource($event)"
          class="border-gray-700 border-t-2 border-b-2"
        />
      </div>
      <div class="w-full overflow-auto">
        <div class="mx-auto" ref="canvaswrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bsimCore from '@bsim/core/dist/build.esm';
import { getHttp } from '../../../shared/api/logged-request';
import EditorRender from './EditorRender.vue';
import EditorExport from './EditorExport.vue';
import EditorSources from './EditorSources.vue';
import EditorSketch from './EditorSketch.vue';

const BASE_BG = '';

const {
  setupFabric: { setupFabricDom },
  parser: {
    parseTemplate: { ExportTemplate },
  },
  render: { renderCanvas },
  computed: { computeSource },
} = bsimCore.lib;

export default {
  components: {
    EditorRender,
    EditorExport,
    EditorSources,
    EditorSketch,
  },
  data() {
    return {
      fabric: {},
      preview: {
        scale: 0.5,
        zoom: 1,
      },
      templateDoc: {
        name: '',
        description: '',
      },
      template: {
        base: BASE_BG,
        baseBack: true,
        sources: [],
        width: 1280,
        height: 720,
      },
      uploadImages: {
        base: undefined,
      },
    };
  },
  computed: {
    account() {
      return this.$store.getters['settings/getOption']('account') || {};
    },
    isLogged() {
      return this.account.logged;
    },
    username() {
      return this.account.username;
    },
  },
  watch: {
    'preview.zoom'() {
      if (parseFloat(this.preview.zoom)) {
        this.fabric.setZoom(this.preview.zoom);
      }
    },
    async 'preview.scale'() {
      if (parseFloat(this.preview.scale)) {
        await this.reset();
      }
    },
  },
  methods: {
    getParsedTemplate() {
      return ExportTemplate(this.template, this.templateDoc);
    },
    async publish() {
      if (!this.templateDoc.name || !this.uploadImages.base) {
        return;
      }
      if (!this.isLogged) {
        const template = JSON.stringify(this.getParsedTemplate());
        const blob = new Blob([template], { type: 'application/json' });
        const templateBlobUrl = URL.createObjectURL(blob);

        this.$router.push({
          name: 'login',
          query: {
            redirect: JSON.stringify({
              name: 'template-editor',
              query: { recover: templateBlobUrl },
            }),
          },
        });
        return;
      }

      const setOption = ([option, value]) => {
        this.$store.commit('shared/setOption', {
          option,
          value,
        });
      };

      const ok = () => {
        setOption(['appLoading', false]);
        setOption(['appLoadingMessage', '']);
      };

      setOption(['appLoading', true]);
      setOption(['appLoadingMessage', 'Preparando o envio do template...']);
      debugger;

      const http = await getHttp();
      const formData = new FormData();
      formData.append('base', this.uploadImages.base);

      setOption(['appLoadingMessage', '0% - enviando imagem']);
      await http
        .post('/images/upload/templates', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async ({ data: { files } }) => {
          setOption(['appLoadingMessage', 'enviando template']);
          const exportedTemplate = ExportTemplate(
            this.template,
            this.templateDoc,
          );
          exportedTemplate.template.base = `@public@/${files.base}`;

          await http.post('/templates', exportedTemplate).then(() => {
            ok();
            this.$router.push({
              name: 'user-explore',
              params: { id: this.username },
            });
          });
        })
        .catch(() => {
          alert('Não foi possível envar a imagem à galeria.');
        });

      ok();
    },
    setupCanvas() {
      const wrapper = this.$refs.canvaswrapper;
      const fabric = setupFabricDom(wrapper, {
        preview: this.preview,
        template: this.template,
      });
      this.fabric = fabric;
    },
    async renderCanvas() {
      await renderCanvas({ fabric: this.fabric, template: this.template });
    },
    computeSource(source) {
      source.computedValues = computeSource.compute(source.type, source.data);
    },
    computeAll() {
      this.template.sources.forEach((source) => {
        this.computeSource(source);
      });
    },
    setOption(to, key, value) {
      this[to][key] = value;
    },
    addSource(ref) {
      this.fabric.add(ref.object);
      this.fabric.centerObject(ref.object);

      const sourceIdx = this.template.sources.push(ref.source);
      const source = this.template.sources[sourceIdx - 1];
      this.computeSource(source);
    },
    async removeSource(idx) {
      const source = this.template.sources[idx];
      this.fabric.remove(source);
      this.template.sources.splice(idx, 1);

      await this.reset();
    },
    setupListeners() {
      this.fabric.on('object:modified', () => {
        this.computeAll();
      });
    },
    async reset() {
      this.setupCanvas();
      await this.renderCanvas();
      this.setupListeners();
    },
  },
  async mounted() {
    await this.reset();
  },
};
</script>

<style lang="scss">
.canvas-container {
  margin: 0 auto;
}
</style>
