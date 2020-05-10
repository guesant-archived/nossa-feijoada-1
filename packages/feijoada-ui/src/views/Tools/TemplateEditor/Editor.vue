<template>
  <div class="text-white">
    <div class="py-16">
      <div class="container mx-auto max-w-xl w-full">
        <EditorSketch
          :template="template"
          @changeOption="setOption($event.to, $event.key, $event.value)"
          @reset="reset"
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
import EditorRender from './EditorRender.vue';
import EditorSources from './EditorSources.vue';
import EditorSketch from './EditorSketch.vue';

const BASE_BG = '';

const {
  setupFabric: { setupFabricDom },
  render: { renderCanvas },
  computed: { computeSource },
} = bsimCore.lib;

export default {
  components: {
    EditorRender,
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
    };
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
