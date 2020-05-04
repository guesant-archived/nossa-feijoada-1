<template>
  <header>
    <div class="bg-gray-600 p-4 flex justify-between items-center">
      <div>
        <router-link class="font-bold" :to="{name: 'home'}">BaianoSimulator</router-link>
      </div>
      <div>
        <ul class="flex">
          <li>
            <router-link :to="{name: 'signup'}">Cadastre-se</router-link>
          </li>
          <li class="not-sr-only mx-2">|</li>
          <li>
            <router-link :to="{name: 'login'}">Entrar</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>