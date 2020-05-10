<template>
  <EditorSection title="Sources">
    <template v-slot:main>
      <div>
        <button @click="addSource('source')">Adicionar source</button>
        <span class="mx-2">|</span>
        <button @click="addSource('text')">Adicionar texto</button>
      </div>
    </template>
  </EditorSection>
</template>

<script>
import * as bsimCore from '@bsim/core/dist/build.esm';
import EditorSection from '@/components/EditorSection.vue';

const {
  sources: { addSource },
} = bsimCore.lib;

export default {
  props: { fabric: Object, template: Object },
  components: {
    EditorSection,
  },
  methods: {
    async addSource(type) {
      if (type === 'source') {
        const ref = await addSource.newSource();
        this.$emit('sourceAdd', ref);
      } else if (type === 'text') {
        const ref = addSource.newText();
        this.$emit('sourceAdd', ref);
      }
    },
  },
};
</script>
