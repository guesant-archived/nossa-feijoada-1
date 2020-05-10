<template>
  <header>
    <div class="bg-gray-600">
      <nav
        class="container max-w-4xl mx-auto p-4 flex flex-wrap justify-between items-center"
      >
        <div class="flex items-center">
          <router-link class="font-bold" :to="{ name: 'home' }"
            >BaianoSimulator</router-link
          >
        </div>
        <div>
          <ul class="flex">
            <li
              v-for="(headerItem, idx) in headerItems"
              :key="`header-item-${idx}`"
            >
              <router-link
                v-if="headerItem.type === 'link'"
                :to="headerItem.to"
              >
                {{ headerItem.text }}
              </router-link>
              <span
                v-else-if="headerItem.type === 'sep'"
                class="inline-block not-sr-only mx-2"
                >{{ headerItem.text }}</span
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.getters['settings/getOption']('account') || {};
    },
    isLogged() {
      return this.account.logged;
    },
    username() {
      return this.account.username;
    },
    headerItems() {
      const sep = { type: 'sep', text: '|' };
      const simpleLink = (to, text) => ({ type: 'link', to, text });
      return [
        simpleLink({ name: 'about' }, 'Galeria'),
        sep,
        simpleLink({ name: 'template-editor' }, 'Editor'),
        sep,
        ...[
          !this.isLogged && simpleLink({ name: 'signup' }, 'Cadastre-se'),
          !this.isLogged && sep,
          !this.isLogged && simpleLink({ name: 'login' }, 'Entrar'),
        ],
        ...[
          this.isLogged &&
            simpleLink(
              { name: 'user-explore', params: { id: this.username } },
              this.username,
            ),
        ],
      ];
    },
  },
};
</script>
