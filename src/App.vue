<script setup>
import { useRouter, RouterView } from 'vue-router'
// const router = useRouter()
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
         <a href=""
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <div>
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav> -->
    <RouterView /> 
  </div>
</template>

