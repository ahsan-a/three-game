import { PerspectiveCamera, Scene, WebGLRenderer, Mesh, BoxBufferGeometry, MeshBasicMaterial } from 'three';

import Resizer from './systems/Resizer';
import Loop from './systems/Loop';

import createCamera from './components/essentials/camera';
import createScene from './components/essentials/scene';
import createRenderer from './systems/renderer';
import { Ticker } from './typings';
import store from '../store';

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let loop: Loop;

export class Game {
	status?: 'home' | 'game';

	constructor(public canvas: HTMLCanvasElement) {
		camera = createCamera(canvas);
		scene = createScene();
		renderer = createRenderer(canvas);
		loop = new Loop(camera, scene, renderer);

		const cube: Mesh<BoxBufferGeometry, MeshBasicMaterial> & Ticker = new Mesh(
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

		new Resizer(camera, renderer);
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

export function createGame(canvas: HTMLCanvasElement) {
	store.state.game = new Game(canvas);
}
