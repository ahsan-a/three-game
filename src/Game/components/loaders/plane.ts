import { Group, MathUtils, PerspectiveCamera, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Ticker } from '../../typings';
import gsap from 'gsap';
import { watchEffect, computed } from 'vue';
import { findBounds } from '../../utils';

import { useGameStore } from '../../../store/game';
let gameStore: ReturnType<typeof useGameStore>;

export async function loadPlane(loader: GLTFLoader) {
	const planeData = await loader.loadAsync('/src/assets/plane.glb');

	const plane: Group & Ticker = planeData.scene;
	// plane.position.set(2, -6, -25);
	plane.castShadow = true;
	plane.receiveShadow = true;

	plane.tick = (delta = 0.16) => {
		plane.children[16].rotation.y -= (plane.tickSpeed || 0) * delta;
	};

	return plane;
}

export function initHome(plane: Group & Ticker, camera: PerspectiveCamera) {
	if (!gameStore) gameStore = useGameStore();

	plane.tickSpeed = MathUtils.degToRad(400);

	plane.rotation.x = MathUtils.degToRad(30);
	plane.rotation.y = MathUtils.degToRad(45);

	plane.position.z = -35;

	/*
	tan(fov/2) (center of screen to edge) == o /a
	o == tan(fov/2) * a
	*/

	const bounds = findBounds(camera, plane);
	plane.position.x = -bounds.x;
	plane.position.y = bounds.y;
	plane.scale.setScalar(0.07);

	watchEffect(() => {
		if (!gameStore.$state.loaded) return;

		setTimeout(() => {
			gsap.to(plane.position, { x: 0, y: 0, z: -1.5, duration: 1 });
		}, 50);
	});
}

let mouse: MouseEvent;
export function initGame(plane: Group & Ticker) {
	gsap.timeline()
		.add('gameInit')
		.to(plane.rotation, { x: 0, y: Math.PI, z: 0, duration: 1 }, 'gameInit')
		.to(plane.position, { z: -2, x: 0, duration: 1 }, 'gameInit')
		.to(plane, { tickSpeed: MathUtils.degToRad(1000), duration: 1 }, 'gameInit');

	document.onmousemove = (e) => (mouse = e);
	plane.tick = (delta = 0.16) => {
		plane.children[16].rotation.y -= (plane.tickSpeed || 0) * delta;

		if (gameStore.$state.game?.status === 'game') {
			followMouse();
		}
	};
}

const plane = computed(() => gameStore.$state.game?.plane);
const camera = computed(() => gameStore.$state.game?.camera);

let vec = new Vector3();
let pos = new Vector3();

function followMouse() {
	if (!mouse) return;
	let planeVec = new Vector3();
	if (!plane.value || !camera.value) return;

	vec.set((mouse.clientX / window.innerWidth) * 2 - 1, -(mouse.clientY / window.innerHeight) * 2 + 1, 0.5);
	vec.unproject(camera.value);
	vec.sub(camera.value.position).normalize();
	pos.copy(camera.value.position).add(vec.multiplyScalar(-plane.value.position.z));
	planeVec.copy(plane.value.position);

	plane.value.position.x += (vec.x - plane.value.position.x) * 0.1;
	plane.value.position.y += (vec.y - plane.value.position.y) * 0.1;

	plane.value.rotation.x = (vec.y - plane.value.position.y) * 2;
	plane.value.rotation.z = (vec.x - plane.value.position.x) * 2;
}
