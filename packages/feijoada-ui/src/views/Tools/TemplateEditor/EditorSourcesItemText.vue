<template>
  <div>
    <div class="flex flex-row flex-wrap text-white">
      <div class="flex flex-col mr-2">
        <label :for="`${sid}--font-family`">Fonte</label>
        <input
          :id="`${sid}--font-family`"
          :value="values && values.fontFamily"
          @change="setOption('fontFamily', $event.target.value)"
          class="text-black w-24"
          type="text"
        />
      </div>
      <div class="flex flex-col mr-2">
        <label :for="`${sid}--text-align`">Alinhamento</label>
        <select
          :id="`${sid}--text-align`"
          :value="values && values.textAlign"
          @change="setOption('textAlign', $event.target.value)"
          class="text-black"
        >
          <option value="left" selected>Esquerda</option>
          <option value="center">Centralizado</option>
          <option value="right">Direita</option>
        </select>
      </div>
      <div class="flex flex-col mr-2">
        <label :for="`${sid}--font-weight`">Peso</label>
        <select
          :id="`${sid}--font-weight`"
          :value="(values && values.fontWeight) || '400'"
          @change="setOption('fontWeight', $event.target.value)"
          class="text-black"
        >
          <option value="100">Extra-fina</option>
          <option value="200">Fina</option>
          <option value="300">Leve</option>
          <option value="400" selected>Normal</option>
          <option value="500">Média</option>
          <option value="600">Semi-bold</option>
          <option value="700">Bold</option>
          <option value="800">Extra-bold</option>
          <option value="900">Black</option>
        </select>
      </div>
      <div class="flex flex-col m2-2">
        <label :for="`${sid}--text-color`">Cor</label>
        <input
          :id="`${sid}--text-color`"
          :value="values && values.fill"
          @change="setOption('fill', $event.target.value || '#000000')"
          type="color"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: { type: Object },
    values: { type: Object },
    sid: { type: [String, Number] },
  },
  methods: {
    setOption(key, value) {
      if (value) {
        this.source.set({ [key]: value });
        this.$emit('render');
      }
    },
  },
};
</script>
