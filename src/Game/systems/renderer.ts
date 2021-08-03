import { WebGLRenderer } from 'three';

export default function createRenderer(canvas: HTMLCanvasElement) {
	const renderer = new WebGLRenderer({
		antialias: true,
		canvas,
		alpha: true,
	});
	renderer.setClearColor(0x000000, 0); // the default
	// renderer.shadowMap.enabled = true;

	// renderer.physicallyCorrectLights = true;

	return renderer;
}
