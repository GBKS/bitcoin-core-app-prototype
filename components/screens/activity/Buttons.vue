<script setup>

</script>

<template>
  <div class="activity-buttons">
    <ScreensActivityButton
      icon="roundedArrowUp"
      label="Send"
      to="/screen/send?t=slide-up"
    />
    <ScreensActivityButton
      icon="roundedArrowDown"
      label="Receive"
      to="/screen/receive?t=slide-up"
    />
  </div>
</template>

<style scoped lang="scss">

.activity-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 35px 0;

  @include container(medium-up) {
    display: none;
  }
}

</style>
