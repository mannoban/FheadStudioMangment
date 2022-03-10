<template>
  <div class="not_found">
    <h2>404 Not Found . . .</h2>
  </div>
</template>


<script>
export default {
  name: "404",
};
</script>

<style>
.not_found {
  background-color: pink;
  width: 100%;
  height: 100%;
}
.not_found > h2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-size: 40px;
}
</style>