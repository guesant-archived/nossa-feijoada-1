<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="bg-gray-500 p-4 rounded">
      <form @submit.prevent="submit">
        <div class="flex flex-col">
          <input
            placeholder="Usuário"
            class="rounded py-1 px-2 my-1 border-solid border-2 border-gray-600"
            v-model="username"
            type="text"
          />
          <ul>
            <li
              v-for="err in errors.filter(
                (err) => err.param === 'account.username',
              )"
              :key="err.param + err.msg"
            >
              <p>{{ err.msg }}</p>
            </li>
          </ul>
          <input
            placeholder="Senha"
            class="rounded py-1 px-2 my-1 border-solid border-2 border-gray-600"
            v-model="password"
            type="password"
          />
          <ul>
            <li
              v-for="err in errors.filter(
                (err) => err.param === 'account.password',
              )"
              :key="err.param + err.msg"
            >
              <p>{{ err.msg }}</p>
            </li>
          </ul>
          <button class="mt-2 px-2 py-1">Entrar</button>
        </div>
        <p>{{ error }}</p>
      </form>
    </div>
    <div class="p-2 mt-1 max-w-xs text-center leading-5">
      <p class="text-gray-600">
        Ainda não fez seu cadastro?
      </p>
      <p class="text-gray-400">
        <router-link
          class="font-bold"
          :to="{
            name: 'signup',
            ...($route.query
              ? { query: { redirect: $route.query.redirect } }
              : {}),
          }"
        >
          Clique aqui para se registrar.</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import publicRequest from '@/shared/api/public-request.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      errors: [],
    };
  },
  watch: {
    username() {
      this.error = '';
    },
    password() {
      this.error = '';
    },
  },
  methods: {
    proceed() {
      const { redirect } = this.$route.query;
      if (redirect) {
        try {
          const parsedRedirect = JSON.parse(redirect);
          return this.$router.push(parsedRedirect);
        } catch (_) {
          /**/
        }
      }
      return this.$router.push({ name: 'home' });
    },
    async submit() {
      if (this.username && this.password) {
        publicRequest
          .post('/users/login', {
            account: { username: this.username, password: this.password },
          })
          .then(async (res) => {
            if (res.status === 200) {
              const {
                account: { token, username },
              } = res.data;
              this.$store.dispatch('settings/updateOption', {
                option: 'account',
                value: {
                  token,
                  username,
                  logged: true,
                },
              });
            }
          })
          .then(() => {
            this.proceed();
          })
          .catch((res) => {
            const { message = '', errors = [] } = res.response.data;

            this.errors = errors;
            this.error = message;
          });
      }
    },
  },
  mounted() {
    const { logged } =
      this.$store.getters['settings/getOption']('account') || {};
    if (logged) {
      this.proceed();
    }
  },
};
</script>
