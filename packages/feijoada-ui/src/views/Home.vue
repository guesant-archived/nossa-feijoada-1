<template>
  <div class="text-white pt-16">
    <Intro />
    <VTemplates />
    <p>...home...</p>
    <VSources />

  </div>
</template>

<script>
import Intro from './Home/Intro.vue';
import VTemplates from './Home/Gallery/VTemplates.vue';
import VSources from './Home/Gallery/VSources.vue';

export default {
  components: {
    Intro,
    VTemplates,
    VSources,
  }
}
</script>
