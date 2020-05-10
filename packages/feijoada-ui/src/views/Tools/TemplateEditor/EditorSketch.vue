<template>
  <EditorSection title="Sketch">
    <template v-slot:main>
      <div class="py-4 flex flex-col">
        <label for="base">Fundo</label>
        <input
          type="file"
          id="base"
          @change="loadBackgroundImage($event.target)"
        />
      </div>
      <div class="flex">
        <div>
          <label class="mr-1">Largura</label>
          <input
            class="text-black w-24"
            type="number"
            :value="template.width"
            @change="
              !isNaN(parseInt($event.target.value)) &&
                changeTemplate('width', parseInt($event.target.value)) &&
                $emit('reset')
            "
          />
        </div>
        <div class="ml-2">
          <label class="mr-1">Altura</label>
          <input
            class="text-black w-24"
            type="number"
            :value="template.height"
            @change="
              !isNaN(parseInt($event.target.value)) &&
                changeTemplate('height', parseInt($event.target.value)) &&
                $emit('reset')
            "
          />
        </div>
      </div>
      <div class="flex items-center">
        <input
          @change="
            changeTemplate('baseBack', !template.baseBack) && $emit('reset')
          "
          :checked="template.baseBack"
          type="checkbox"
          class="mr-2"
          id="c1"
        />
        <label for="c1">Imagem ao fundo</label>
      </div>
    </template>
  </EditorSection>
</template>

<script>
import EditorSection from '@/components/EditorSection';
import checkFileAPI from '../../../shared/check-file-api';

const loadImg = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.addEventListener('error', reject);
    image.src = src;
  });
};
export default {
  props: { template: Object },
  components: {
    EditorSection,
  },
  data() {
    return {
      readerApi: checkFileAPI(),
    };
  },
  methods: {
    changeTemplate(key, value) {
      this.$emit('changeOption', { to: 'template', key, value });
      return true;
    },
    async loadBackgroundImage(target) {
      if (target.files && target.files[0] && target.files[0] instanceof File) {
        const file = target.files[0];
        const blobUrl = URL.createObjectURL(file);
        loadImg(blobUrl)
          .then((image) => {
            const { naturalWidth, naturalHeight } = image;
            this.$emit('changeOption', {
              to: 'template',
              key: 'width',
              value: naturalWidth,
            });
            this.$emit('changeOption', {
              to: 'template',
              key: 'height',
              value: naturalHeight,
            });
            this.$emit('changeOption', {
              to: 'template',
              key: 'base',
              value: blobUrl,
            });
            this.$emit('reset');
          })
          .catch((err) => {
            console.error(err);
            alert('Não foi possível carregar a imagem.');
          });
      }
      return true;
    },
  },
};
</script>
