import { PerspectiveCamera, Scene, WebGLRenderer, Group, Clock } from 'three';
import * as cannon from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { computed } from 'vue';

import Resizer from './systems/Resizer';
import Loop from './systems/Loop';

import createCamera from './components/essentials/camera';
import createScene from './components/essentials/scene';
import createRenderer from './systems/renderer';
import createLights from './components/essentials/lights';

import * as Plane from './components/loaders/plane';
import * as Enemies from './components/particles/enemies';

import { Ticker } from './typings';

import { useGameStore } from '../store/game';

let gameStore: ReturnType<typeof useGameStore>;

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let loop: Loop;
let plane: Group & Ticker;
const loader = new GLTFLoader();

export type Status = 'home' | 'loading' | 'game';

export class Game {
	status?: Status;
	world: cannon.World;
	camera: PerspectiveCamera;
	scene: Scene;
	loop: Loop;
	clock: Clock;
	gameTime: number | null = 1;

	plane?: Group & Ticker;

	constructor(public canvas: HTMLCanvasElement) {
		camera = createCamera(canvas);
		this.camera = camera;

		scene = createScene();
		this.scene = scene;

		renderer = createRenderer(canvas);
		loop = new Loop(camera, scene, renderer);
		this.loop = loop;

		this.clock = new Clock();

		this.world = new cannon.World();
		this.world.gravity.set(0, 0, 0);

		new Resizer(camera, renderer);
	}
	async init() {
		const { ambientLight, hemisphereLight, shadowLight } = createLights();
		scene.add(ambientLight, hemisphereLight, shadowLight);

		plane = await Plane.loadPlane(loader);
		this.plane = plane;
		scene.add(plane);

		loop.updatables.push(plane);
	}
	start() {
		loop.start();
	}
	stop() {
		loop.stop();
	}

	startGameTimer() {
		const game = computed(() => gameStore.$state.game);
		if (!game.value) return;
		if (!game.value.gameTime) game.value.gameTime = 0;
		game.value.gameTime++;
	}

	initHome = () => Plane.initHome(plane, camera);
	initLoad() {
		Plane.initGame(plane);
		gameStore.setStatus('game');
		this.startGameTimer();
		setInterval(this.startGameTimer, 1000);
		Enemies.createEnemies();
	}
}

export function createGame(canvas: HTMLCanvasElement) {
	gameStore = useGameStore();
	gameStore.$state.game = new Game(canvas);
}
