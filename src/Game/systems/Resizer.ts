import { PerspectiveCamera, WebGLRenderer } from 'three';

export default class Resizer {
	constructor(
		container: HTMLCanvasElement,
		camera: PerspectiveCamera,
		renderer: WebGLRenderer
	) {
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
	}
}
