<template>
  <section>
    <slot name="wrap" />

    <div class="px-4 md:px-16">
      <slot name="before" />
      <slot />
      <slot name="after" />
    </div>

    <slot name="wrap" />
  </section>
</template>
