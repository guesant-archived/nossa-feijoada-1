<template>
  <div class="flex items-center justify-center h-full">
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
              this.$router.push({ name: 'home' });
            }
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
      this.$router.push({ name: 'home' });
    }
  },
};
</script>
