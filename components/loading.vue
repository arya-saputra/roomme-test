<template>
  <div class="loading-screen">
    <img src="/img/loading.gif" />
  </div>
</template>
<style scoped>
.loading-screen{
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
}

.loading-screen img{
  width:40%;
}
</style>
