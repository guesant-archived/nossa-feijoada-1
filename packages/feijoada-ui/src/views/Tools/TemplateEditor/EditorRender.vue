<template>
  <EditorSection>
    <template v-slot:main>
      <div class="flex flex-row items-baseline">
        <div class="flex flex-row">
          <label for="template-editor--render--scale">Tamanho do preview</label>
          <input
            class="w-12 text-center text-black"
            type="text"
            id="template-editor--render--scale"
            :value="preview.scale"
            @change="
              !isNaN(parseFloat($event.target.value)) &&
                changePreview('scale', parseFloat($event.target.value))
            "
          />
        </div>
        <div class="flex flex-row ml-2">
          <label for="template-editor--render--zoom">Zoom do canvas</label>
          <input
            class="w-12 text-center text-black"
            type="text"
            id="template-editor--render--zoom"
            :value="preview.zoom"
            @change="
              !isNaN(parseFloat($event.target.value)) &&
                changePreview('zoom', parseFloat($event.target.value))
            "
          />
        </div>
        <span class="mx-2">|</span>
        <div>
          <button @click="$emit('render')">Re-renderizar</button>
        </div>
      </div>
    </template>
  </EditorSection>
</template>

<script>
import EditorSection from '@/components/EditorSection';

export default {
  props: { preview: Object },
  components: {
    EditorSection,
  },
  methods: {
    changePreview(key, value) {
      this.$emit('changeOption', { to: 'preview', key, value });
    },
  },
};
</script>
