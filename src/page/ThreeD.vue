<template>
  <div class='three' id="three"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {addEnvironment} from '../utils/addEnvironment';

// three中不要将scene、renderer、放到data中创建 不然会报错
export default {
  name: 'threed',
  data() {
    return {
    }
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
      this.camera.position.y = 100;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.threeDiv = document.getElementById('three');
      this.threeDiv.appendChild( this.renderer.domElement );

      this.env = new addEnvironment(this.scene, this.renderer);

      this.animate();
      this.eventListen();
    },
    animate() {
      this.env.water.material.uniforms['time'].value += 1.5 / 60.0;
      requestAnimationFrame( this.animate );
      this.renderer.render( this.scene, this.camera );
      this.controls.update();
    },
    eventListen() {
      window.addEventListener(
        'resize',
        function () {
            if (this.camera) {
                this.camera.aspect = this.threeDiv.offsetWidth / this.threeDiv.offsetHeight;
                this.renderer.setSize(this.threeDiv.offsetWidth, this.threeDiv.offsetHeight); // 重新获取
                this.camera.updateProjectionMatrix();
                this.renderer.render(this.scene, this.camera);
            }
        },
        false,
    );
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.three {
  width: 100%;
  height: 100%;
}
</style>