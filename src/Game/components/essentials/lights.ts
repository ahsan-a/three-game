import { HemisphereLight, AmbientLight, DirectionalLight } from 'three';

export default function createLights() {
	const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);

	const ambientLight = new AmbientLight(0xdc8874, 0.5);

	const shadowLight = new DirectionalLight(0xffffff, 0.9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = 4096;
	shadowLight.shadow.mapSize.height = 4096;

	return {
		hemisphereLight,
		ambientLight,
		shadowLight,
	};
}
