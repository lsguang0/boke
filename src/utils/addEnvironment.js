import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';
import * as THREE from 'three';

export class addEnvironment {
    constructor(scene, renderer, props) {
        this.scene = scene;
        this.renderer = renderer;
        this.sun = new THREE.Vector3();
        this.AmbientLight = null;
        this.parameters = {
            elevation: 5,
            azimuth: -170,
        };
        this.water;
        this.sky;
        this.init(props)
    }
    init = (date) => {
        if (date) {
            this.initAmbientLight();
            this.initSkyBox(date);
            this.initWater();
            this.updateSun();
        } else {
            this.initWater();
            this.initSky();
            this.updateSun();
            // this.initGUI();
        }
    };
    initAmbientLight() {
        const light = new THREE.AmbientLight(0x404040, 2); // soft white light
        this.scene.add(light);
    }
    initSkyBox(date) {
        let r = './scene/blue/';
        if (date === 'night') {
            r = './scene/night/';
        }
        let urls = [
            r + 'posx.jpg',
            r + 'negx.jpg',
            r + 'posy.jpg',
            r + 'negy.jpg',
            r + 'posz.jpg',
            r + 'negz.jpg',
        ];
        let textureCube = new THREE.CubeTextureLoader().load(urls);
        this.scene.background = textureCube;
    }
    initWater = () => {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        this.water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
                './images/waternormals.jpg',
                function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                },
            ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: this.scene.fog !== undefined,
        });
        this.water.position.z = -10;
        this.water.rotation.x = -Math.PI / 2;
        this.scene.add(this.water);
    };
    initSky = () => {
        this.sky = new Sky();
        this.sky.scale.setScalar(100000);
        const skyUniforms = this.sky.material.uniforms;
        skyUniforms['turbidity'].value = 10;
        skyUniforms['rayleigh'].value = 2;
        skyUniforms['mieCoefficient'].value = 0.005;
        skyUniforms['mieDirectionalG'].value = 0.8;
        this.scene.add(this.sky);
    };
    initGUI = () => {
        const gui = new GUI();
        const folderSky = gui.addFolder('Sky');
        folderSky
            .add(this.parameters, 'elevation', 0, 180, 0.1)
            .onChange(this.updateSun);
        folderSky
            .add(this.parameters, 'azimuth', -180, 180, 0.1)
            .onChange(this.updateSun);
        folderSky.open();
    };
    updateSun = () => {
        // 为了太阳尺寸设置
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        const phi = THREE.MathUtils.degToRad(90 - this.parameters.elevation);
        const theta = THREE.MathUtils.degToRad(this.parameters.azimuth);
        this.sun.setFromSphericalCoords(1, phi, theta);
        this.water.material.uniforms['sunDirection'].value
            .copy(this.sun)
            .normalize();
        if (this.sky) {
            const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
            this.sky.material.uniforms['sunPosition'].value.copy(this.sun);
            this.scene.environment = pmremGenerator.fromScene(this.sky).texture;
        }
    };
}
