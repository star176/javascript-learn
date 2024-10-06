<template>
  <div>
    <h1>app</h1>
    <router-link to="/about/a">跳转a</router-link>
    <router-link to="/about/b">跳转b</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "./router";
const router = useRouter();
const route = useRoute();
</script>

<style></style>
