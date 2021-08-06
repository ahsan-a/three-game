import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Ticker } from '../typings';

const clock = new Clock();

export default class Loop {
	updatables: Ticker[] = [];
	constructor(public camera: PerspectiveCamera, public scene: Scene, public renderer: WebGLRenderer) {}
	start() {
		this.renderer.setAnimationLoop(() => {
			this.tick();
			this.renderer.render(this.scene, this.camera);
		});
	}
	stop() {
		this.tick();
		this.renderer.setAnimationLoop(null);
	}

	tick = () => this.updatables.forEach((x) => x.tick?.(clock.getDelta()));
}
