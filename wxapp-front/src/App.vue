<template></template>
<script lang="ts">
import { setStartWide } from './utils/fontSizeHandler';

export default {
  onLaunch() {
    setStartWide(uni.getSystemInfoSync().windowWidth > 768)
  }
}
</script>
<style>
/* #ifdef APP-PLUS-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */
</style>
