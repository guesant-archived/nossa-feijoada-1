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
            required
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
            placeholder="Email"
            class="rounded py-1 px-2 my-1 border-solid border-2 border-gray-600"
            v-model="email"
            type="email"
            required
          />
          <ul>
            <li
              v-for="err in errors.filter(
                (err) => err.param === 'account.email',
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
            required
          />
          <ul>
            <li
              v-for="err in errors.filter(
                (err) => err.param === 'account.password',
              )"
              :key="err.param + err.msg"
            >
              {{ err.msg }}
            </li>
          </ul>
          <button class="mt-2 px-2 py-1">Cadastrar</button>
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
      email: '',
      password: '',
      error: '',
      errors: [],
    };
  },
  watch: {
    username() {
      this.errors = this.errors.filter((i) => i.param !== 'account.username');
    },
    email() {
      this.errors = this.errors.filter((i) => i.param !== 'account.email');
    },
    password() {
      this.errors = this.errors.filter((i) => i.param !== 'account.password');
    },
  },
  methods: {
    async submit() {
      if (this.username && this.password && this.email) {
        publicRequest
          .post('/users', {
            account: {
              email: this.email,
              username: this.username,
              password: this.password,
            },
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
            const { errors = [], message = '' } = res.response.data;

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
