<template>
  <EditorSection title="Exportar">
    <template v-slot:main>
      <div class="mt-2">
        <div>
          <div class="flex flex-col">
            <label for="editor--export--toc-name">Nome</label>
            <input
              id="editor--export--toc-name"
              :value="templateDoc.name"
              @input="changeTemplateDoc('name', $event.target.value)"
              class="text-black"
              placeholder="Nome do template"
              type="text"
            />
          </div>
          <div class="flex flex-col">
            <label for="editor--export--toc-desc">Descrição</label>
            <input
              id="editor--export--toc-desc"
              :value="templateDoc.description"
              @input="changeTemplateDoc('description', $event.target.value)"
              class="text-black"
              placeholder="Descrição do template"
              type="text"
            />
          </div>
          <div>
            <div class="mt-1 flex flex-wrap items-baseline pt-1">
              <div>
                <label
                  class="block py-1 px-2 rounded hover:bg-gray-700"
                  :class="readerApi ? 'cursor-pointer' : 'cursor-not-allowed'"
                  for="editor--export--load-template"
                  >Importar template</label
                >
                <input
                  class="sr-only"
                  id="editor--export--load-template"
                  ref="templateimport"
                  @change="importTemplateByEvent($event)"
                  type="file"
                />
              </div>
              <button
                class="py-1 px-2 mx-1 rounded hover:bg-gray-700"
                @click="downloadTemplate"
              >
                Baixar template
              </button>
              <button
                class="py-1 px-2 rounded"
                :class="
                  canPublish
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'cursor-not-allowed'
                "
                @click="$emit('publish')"
              >
                Publicar no BaianoSimulator
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </EditorSection>
</template>

<script>
import * as bsimCore from '@bsim/core/dist/build.esm';
import checkFileAPI from '../../../shared/check-file-api';
import EditorSection from '@/components/EditorSection';

const {
  parser: {
    parseTemplate: { ExportTemplate, ImportTemplate },
  },
} = bsimCore.lib;

const readTextFile = (blob) =>
  new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = res;
    reader.onabort = rej;

    reader.readAsText(blob);
  });

export default {
  props: { template: Object, templateDoc: Object },
  components: { EditorSection },
  computed: {
    canPublish() {
      return this.templateDoc.name && this.template.sources.length;
    },
    canPublishInfo() {
      const displayInfo = [];
      if (!this.templateDoc.name || !this.template.sources.length) {
        displayInfo.push(
          [
            'Para publicar no BaianoSimulator o template precisa ter um nome',
            'e pelo menos uma source.',
            'Também é necessário estar logado.',
          ].join(' '),
        );
      }
      return displayInfo.join(' ');
    },
  },
  data() {
    return {
      readerApi: checkFileAPI(),
    };
  },
  methods: {
    changeTemplateDoc(key, value) {
      this.$emit('changeOption', { to: 'templateDoc', key, value });
    },
    getParsedTemplate() {
      return ExportTemplate(this.template, this.templateDoc);
    },
    downloadTemplate() {
      const template = this.getParsedTemplate();
      const templateJSON = JSON.stringify(template);

      const blob = new Blob([templateJSON], { type: 'application/json' });
      const filename = `btemplate.json`;

      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Atualize seu navegador');
      }
    },
    importTemplateByEvent($event) {
      const file = $event.target.files[0];
      if (file) {
        readTextFile(file)
          .then(({ target: { result } }) => {
            return ImportTemplate(JSON.parse(result)).then(
              ({ template, templateDoc }) => {
                Object.entries(template).forEach(([key, value]) => {
                  this.$emit('changeOption', { to: 'template', key, value });
                });
                Object.entries(templateDoc).forEach(([key, value]) => {
                  this.$emit('changeOption', {
                    to: 'templateDoc',
                    key,
                    value,
                  });
                });
                this.$emit('reset');
              },
            );
          })
          .catch(() => {
            alert('Não foi possível importar o arquivo.');
          });
      }
    },
  },
};
</script>
