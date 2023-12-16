<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const channelId = ref();
const router = useRoute();

channelId.value = router.params.channelId;

</script>

<template>
  Chat
  {{ channelId }}
</template>