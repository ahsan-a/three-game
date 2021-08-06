import { PerspectiveCamera, Scene, WebGLRenderer, Group, MathUtils } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { watchEffect } from 'vue';
import tween from '@tweenjs/tween.js';

import Resizer from './systems/Resizer';
import Loop from './systems/Loop';

import createCamera from './components/essentials/camera';
import createScene from './components/essentials/scene';
import createRenderer from './systems/renderer';
import * as Plane from './components/loaders/plane';
import createLights from './components/essentials/lights';

import { Ticker } from './typings';

import { useGameStore } from '../store/game';

let gameStore: ReturnType<typeof useGameStore>;

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let loop: Loop;
let plane: Group & Ticker;
const loader = new GLTFLoader();

export type Status = 'home' | 'game';

export class Game {
	status?: Status;

	constructor(public canvas: HTMLCanvasElement) {
		camera = createCamera(canvas);
		scene = createScene();
		renderer = createRenderer(canvas);
		loop = new Loop(camera, scene, renderer);

		new Resizer(camera, renderer);
	}
	async init() {
		const { ambientLight, hemisphereLight, shadowLight } = createLights();
		scene.add(ambientLight, hemisphereLight, shadowLight);

		plane = await Plane.loadPlane(loader);
		scene.add(plane);

		this.render();
		loop.updatables.push(plane);
	}
	render = () => renderer.render(scene, camera);
	start() {
		loop.start();
	}
	stop() {
		loop.stop();
	}

	initHome() {
		Plane.initHome(plane, camera);
	}
}

export function createGame(canvas: HTMLCanvasElement) {
	gameStore = useGameStore();
	gameStore.$state.game = new Game(canvas);
}
