import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { useGameStore } from '../../store/game';
import { Ticker } from '../typings';

const clock = new Clock();

export default class Loop {
	updatables: Ticker[] = [];
	constructor(public camera: PerspectiveCamera, public scene: Scene, public renderer: WebGLRenderer) {}
	start() {
		const gameStore = useGameStore();
		this.renderer.setAnimationLoop(() => {
			this.tick();
			this.renderer.render(this.scene, this.camera);
			// gameStore.$state.game?.world.step(1 / 60);
		});
	}
	stop() {
		this.tick();
		this.renderer.setAnimationLoop(null);
	}

	tick = () => {
		const delta = clock.getDelta();
		this.updatables.forEach((x) => x.tick?.(delta));
	};
}
