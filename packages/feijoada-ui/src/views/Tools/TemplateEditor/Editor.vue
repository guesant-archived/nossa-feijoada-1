<template>
  <div class="text-white">
    <div class="py-16">
      <div class="container mx-auto max-w-xl w-full">
        <EditorSketch
          :template="template"
          @changeOption="setOption($event.to, $event.key, $event.value)"
          @reset="reset"
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
import EditorSketch from './EditorSketch.vue';

const BASE_BG = '';

const {
  setupFabric: { setupFabricDom },
  render: { renderCanvas },
  computed: { computeSource },
} = bsimCore.lib;

export default {
  components: {
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
    setOption(to, key, value) {
      this[to][key] = value;
    },
    setupListeners() {
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