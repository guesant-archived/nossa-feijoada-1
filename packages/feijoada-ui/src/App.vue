<template>
  <div id="app">
    <div class="min-h-screen bg-gray-900">
      <div>
        <Header />
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }

}
</script>
