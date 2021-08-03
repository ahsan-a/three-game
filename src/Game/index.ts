import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	Mesh,
	BoxBufferGeometry,
	MeshBasicMaterial,
} from 'three';

import Resizer from './systems/Resizer';
import Loop from './systems/Loop';

import createCamera from './components/essentials/camera';
import createScene from './components/essentials/scene';
import createRenderer from './systems/renderer';
import { Ticker } from './typings';

import { Ref, ref } from 'vue';

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let loop: Loop;

let game: Ref<Game>;

export class Game {
	status?: 'home' | 'game';
	x = 0;

	constructor(public canvas: HTMLCanvasElement) {
		camera = createCamera(canvas);
		scene = createScene();
		renderer = createRenderer(canvas);
		loop = new Loop(camera, scene, renderer);

		const cube: Mesh<BoxBufferGeometry, MeshBasicMaterial> & Ticker =
			new Mesh(
				new BoxBufferGeometry(),
				new MeshBasicMaterial({
					color: 0xffffff,
				})
			);

		cube.tick = () => {
			cube.rotation.x += 0.1;
		};

		scene.add(cube);
		loop.updatables.push(cube);

		const resizer = new Resizer(canvas, camera, renderer);
		this.render();
	}
	render = () => renderer.render(scene, camera);
	start() {
		loop.start();
	}
	stop() {
		loop.stop();
	}
}

export const getGame = () => game;

export function createGame(canvas: HTMLCanvasElement) {
	game = ref(new Game(canvas));
	return game;
}
