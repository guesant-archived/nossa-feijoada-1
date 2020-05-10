<template>
  <EditorSection title="Sources">
    <template v-slot:main>
      <div>
        <ul class="border-gray-700 border-t-2 my-2">
          <li
            class="border-gray-700 border-b-2 py-2 pb-3"
            v-for="(source, idx) in template.sources"
            :key="`editor--sources--item--${source.sourceId}`"
          >
            <div class="flex">
              <span>{{ sourceDisplayText(idx) }}</span>
              <span class="mx-1">|</span>
              <button @click="removeSource(idx)">Remover</button>
            </div>
            <div v-if="source.type === 'slot'">
              <EditorSourcesItemSlot
                :options="source.options"
                :sid="source.sourceId"
                :source="source.data"
                :values="source.computedValues"
                @render="fabric.requestRenderAll()"
                @setSourceOption="updateSource(source, $event)"
              />
            </div>
            <div v-else-if="source.type === 'text'">
              <EditorSourcesItemText
                :sid="source.sourceId"
                :source="source.data"
                :values="source.computedValues"
                @render="fabric.requestRenderAll()"
              />
            </div>
          </li>
        </ul>
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
import EditorSourcesItemSlot from './EditorSourcesItemSlot.vue';
import EditorSourcesItemText from './EditorSourcesItemText.vue';

const {
  sources: { addSource },
} = bsimCore.lib;

export default {
  props: { fabric: Object, template: Object },
  components: {
    EditorSection,
    EditorSourcesItemSlot,
    EditorSourcesItemText,
  },
  methods: {
    updateSource(source, { key, value }) {
      source.options[key] = value;
    },
    removeSource(idx) {
      this.$emit('sourceRemove', idx);
    },
    async addSource(type) {
      if (type === 'source') {
        const ref = await addSource.newSource();
        this.$emit('sourceAdd', ref);
      } else if (type === 'text') {
        const ref = addSource.newText();
        this.$emit('sourceAdd', ref);
      }
    },
    sourceDisplayText(idx) {
      return `#${String(idx + 1).padStart(
        String(this.template.sources.length).length + 1,
        '0',
      )}`;
    },
  },
};
</script>
