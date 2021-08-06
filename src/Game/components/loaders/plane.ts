import { Group, MathUtils, PerspectiveCamera } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Ticker } from '../../typings';
import gsap from 'gsap';
import { watchEffect } from 'vue';

import { useGameStore } from '../../../store/game';
let gameStore: ReturnType<typeof useGameStore>;

export async function loadPlane(loader: GLTFLoader) {
	const planeData = await loader.loadAsync('/src/assets/plane.glb');

	const plane: Group & Ticker = planeData.scene;
	// plane.position.set(2, -6, -25);
	plane.castShadow = true;
	plane.receiveShadow = true;

	plane.tick = (delta = 0.16) => {
		plane.children[16].rotation.x -= (plane.tickSpeed || 0) * delta;
	};

	return plane;
}

export function initHome(plane: Group & Ticker, camera: PerspectiveCamera) {
	if (!gameStore) gameStore = useGameStore();

	plane.tickSpeed = MathUtils.degToRad(600);

	plane.rotation.x = MathUtils.degToRad(30);
	plane.rotation.y = MathUtils.degToRad(-40);

	let fov = ((camera.fov / 180) * Math.PI) / 2;
	plane.position.z = -35;

	/*
	tan(fov/2) (center of screen to edge) == o /a
	o == tan(fov/2) * a
	*/

	plane.position.x = -(Math.tan(fov) * camera.position.distanceTo(plane.position) * camera.aspect);
	plane.position.y = Math.tan(fov) * camera.position.distanceTo(plane.position);

	watchEffect(() => {
		if (!gameStore.$state.loaded) return;

		setTimeout(() => {
			gsap.to(plane.position, { x: 0, y: -2, z: -12, duration: 1 });
		}, 50);
	});
}
