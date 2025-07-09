<script setup>
</script>

<template>
  <div class="sent-confirmation">
    <div class="content">
      <KitIconInCircle icon="check" color="green" size="huge" theme="light" />
      <h1 class="-title-2">Transaction sent</h1>
      <p class="-body-5">Based on your selected fee rate, it should be confirmed within the next 10 minutes.</p>
      <div class="options">
        <KitButton
          label="View transaction"
          theme="outline"
          to="/screen/transaction?t=slide-down"
        />
        <KitButton
          label="Done"
          to="/screen/send?t=slide-down"
        />
      </div>
   </div>  
  </div>
</template>

<style scoped lang="scss">
.sent-confirmation {
  position: absolute;
  background-color: var(--neutral-0);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-width: 450px;
    padding-top: 50px;

    h1,p {
      text-align: center;
    }

    .options {
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-self: stretch;

      ::v-deep(> *) {
        flex-basis: 30%;
        flex-grow: 1;
      }
    }
  }
}
</style>
