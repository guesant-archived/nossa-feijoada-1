<template>
  <div>
    <div class="flex flex-row flex-wrap text-black">
      <div class="flex">
        <input
          :value="values.left"
          @input="setCoord('left', $event.target.value, parseInt)"
          placeholder="x"
          class="w-16"
          type="text"
        />
        <input
          :value="values.top"
          @input="setCoord('top', $event.target.value, parseInt)"
          placeholder="y"
          class="w-16"
          type="text"
        />
      </div>
      <div class="flex mx-2">
        <input
          :value="values.width"
          @input="
            parseInt($event.target.value) !== NaN &&
              source.scaleToWidth(parseInt($event.target.value)) &&
              $emit('render')
          "
          placeholder="largura"
          class="w-16"
          type="text"
        />
        <input
          :value="values.height"
          type="text"
          @input="
            parseInt($event.target.value) !== NaN &&
              source.scaleToHeight(parseInt($event.target.value)) &&
              $emit('render')
          "
          class="w-16"
          placeholder="altura"
        />
      </div>
      <div class="flex">
        <input
          :value="values.angle"
          @input="setCoord('angle', $event.target.value, parseFloat)"
          placeholder="ângulo"
          class="w-16"
          type="text"
        />
      </div>
      <div class="flex items-center">
        <input
          :checked="options.preferTransparent"
          @change="emitOption('preferTransparent', !options.preferTransparent)"
          :id="`${sid}--prefer-transparent`"
          type="checkbox"
        />
        <label class="text-white ml-1" :for="`${sid}--prefer-transparent`"
          >Melhor com uma imagem transparente</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: { type: Object },
    values: { type: Object },
    options: { type: Object, default: () => ({}) },
    sid: { type: [String, Number] },
  },
  methods: {
    setCoord(key, value, valueParser) {
      if (!isNaN(valueParser(value))) {
        this.source.set({ [key]: valueParser(value) });
        this.source.setCoords();
        this.$emit('render');
      }
    },
    emitOption(key, value) {
      this.$emit('setSourceOption', { key, value });
    },
  },
};
</script>
