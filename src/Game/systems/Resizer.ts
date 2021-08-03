import { PerspectiveCamera, WebGLRenderer } from 'three';

function setSize(camera: PerspectiveCamera, renderer: WebGLRenderer) {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
}

export default class Resizer {
	constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
		setSize(camera, renderer);

		window.addEventListener('resize', () => {
			setSize(camera, renderer);
			this.onResize();
		});
	}
	onResize() {}
}
