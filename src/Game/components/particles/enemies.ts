import { useGameStore } from '../../../store/game';
import { computed } from 'vue';
import { Ticker } from '../../typings';
import { findBounds } from '../../utils';

import { MeshStandardMaterial, Mesh, DodecahedronBufferGeometry } from 'three';

/*
	[x] create enemy
	[x] clone enemy with loop and set position
	[x] make enemy move towards player 
	[x] delete enemy from world if behind camera
	[ ] make enemies spawn in randomised z levels 
	[ ] create collision logic
*/
export async function createEnemies() {
	const gameStore = useGameStore();

	const [plane, scene, camera] = [
		computed(() => gameStore.$state.game?.plane),
		computed(() => gameStore.$state.game?.scene),
		computed(() => gameStore.$state.game?.camera),
	];

	if (!plane.value || !scene.value || !camera.value) return;

	const enemy: Mesh & Ticker = new Mesh(new DodecahedronBufferGeometry(0.2), new MeshStandardMaterial({ color: 0xff2b2b }));

	enemy.position.z = -27;
	enemy.receiveShadow = true;

	function createClone() {
		if (!camera.value || !plane.value) return;
		const bounds = findBounds(camera.value, plane.value, -5);
		const clone = enemy.clone();
		clone.position.x = Math.random() * (bounds.x - -bounds.x + 1) + -bounds.x;
		clone.position.y = Math.random() * (bounds.x - -bounds.x + 1) + -bounds.x;
		clone.tick = async (delta) => {
			const gameStore = useGameStore();
			if (!gameStore.$state.game?.gameTime) clone.position.z += 10 * delta;
			else clone.position.z += Math.max(0, Math.log2(gameStore.$state.game.gameTime * 10) * delta);
			// 7 * delta

			clone.rotation.x += 0.01;
			clone.rotation.y += 0.01;
			clone.rotation.z += 0.01;
			if (clone.position.z > (camera.value?.position.z || 0)) {
				scene.value?.remove(clone);
				// @ts-ignore
				gameStore.$state.game.loop.updatables = gameStore.$state.game.loop.updatables.filter((x) => x.id !== clone.id);
			}
		};
		scene.value?.add(clone);
		gameStore.$state.game?.loop.updatables.push(clone);
	}

	function spawnLoop() {
		if (!gameStore.$state.game?.gameTime) return;

		// for (let i = 0; i < Math.min(50, Math.ceil(Math.log2(gameStore.$state.game.gameTime) * 6)); i++) {
		createClone();
		// }
	}

	spawnLoop();
	if (!gameStore.$state.game?.gameTime) return;
	setInterval(spawnLoop, Math.max(90 - Math.log2(gameStore.$state.game.gameTime) * 13, 1));
}
