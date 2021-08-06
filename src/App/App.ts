import { defineComponent, ref, Ref, onMounted } from 'vue';
import { createGame, Game } from '../Game';

import { useGameStore } from '../store/game';

import Home from '../components/Home/Home.vue';
import Player from '../components/Player.vue';

export default defineComponent({
	components: {
		Home,
		Player,
	},
	setup() {
		const gameStore = useGameStore();

		window.onload = () => (gameStore.$state.loaded = true);

		onMounted(async () => {
			const canvas = document.getElementById('scene') as HTMLCanvasElement;
			if (!canvas) return alert('an error occurred.');

			createGame(canvas);
			await gameStore.$state.game?.init();

			if (!gameStore.$state.game) return;
			gameStore.$state.game.start();
			gameStore.setStatus('home');
		});

		function handlePlayer() {
			setTimeout(() => {}, 1000);
		}

		return { gameStore, handlePlayer };
	},
});
