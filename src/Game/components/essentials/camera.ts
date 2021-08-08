import { PerspectiveCamera } from 'three';

export default function createCamera(canvas: HTMLCanvasElement): PerspectiveCamera {
	const camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 20);
	camera.position.set(0, 0, 0);

	return camera;
}
