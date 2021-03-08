<template>

</template>
<script>
export default {
  mounted() {
    window.opener.openFB.oauthCallback(window.location.href);
    window.close();
  }
}
</script>
