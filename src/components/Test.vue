<template>
  <div class="wrapper">
    <div class="info pic-wrapper">
      <img class=" pic" :src="pic">
    </div>
    <div class="info">
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>two</p>
      <p>three</p>
    </div>
    <div class="info">
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>two</p>
      <p>three</p>
    </div>
    <div class="info">
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>one dqwdqwd qwdqwdqw qdwdqwdqdqdq dqwdqwdq</p>
      <p>two</p>
      <p>three</p>
    </div>
  </div>
</template>

<script>
import pic1 from '@/assets/picture/dima.png';
import pic2 from '@/assets/picture/ruslan.png';

export default {
  name: 'Test',
  data() {
    return {
      pic: pic1,
    };
  },
};
</script>

<style lang="scss">

html, body {

}


.wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  .pic-wrapper{
    overflow: hidden;
    flex: auto;
    text-align: center;

  }
  .pic {
    height: 100%;
  }


}
.pic-wrapper{

}
.info {
  flex: 0;
  background: cyan;
  border: 1px solid;
}
</style>
