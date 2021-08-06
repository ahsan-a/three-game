import { PerspectiveCamera } from 'three';

export default function createCamera(canvas: HTMLCanvasElement): PerspectiveCamera {
	const camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
	camera.position.set(0, 0, 10);

	return camera;
}
