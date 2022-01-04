<template>
  <div class='admin'> 
    <div class = 'header' @click="changePage">
      <div :class = "`item ${showPageName.name === 'Home' ? 'select-item' : ''}`" title='Home'>Home</div>
      <div :class = "`item ${showPageName.name === 'ThreeD' ? 'select-item' : ''}`" title='ThreeD'>3D</div>
      <div :class = "`item ${showPageName.name === 'Note' ? 'select-item' : ''}`" title='Note'>Note</div>
    </div>
    <div class = 'body'>
      <component :is="showPageName.component" :ref="showPageName.name"></component>
    </div>
    <div class = 'footer'>
      持续更新中。。。
    </div>
  </div>
</template>

<script>
import Home from './Home.vue';
import Note from './Note.vue';
import ThreeD from './ThreeD.vue';

export default {
  components: {
    Home,
    Note,
    ThreeD
  },
  data() {
    return {
      index: 0,
      showPageName: {
        name: 'Home',
        component: Home
      }
    }
  },
  methods: {
    changePage(e) {
      this.$data.showPageName = {
        component: `${e.target.title}`,
        name: e.target.title
      }
    }
  },
  mounted() {

  }
  

}
</script>


<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  position: relative;

  .header {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;

    .item {
      height: 58px;
      color: #fff;
      border-bottom: 2px solid #fff;
      padding: 0 10px;
      line-height: 58px;

      &:nth-last-child(1) {
        margin-right: 50px;
      }
    }
    .item:hover {
      color: skyblue;
      border-bottom: 2px solid skyblue;
    }
    .select-item {
      color: skyblue;
      border-bottom: 2px solid skyblue;
    }
  }
  .body {
    width: 100%;
    height: calc(100% - 60px);
  }
  .footer {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
}
</style>