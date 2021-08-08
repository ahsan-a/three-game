import { defineComponent } from 'vue';

import { useGameStore } from '../../store/game';

export default defineComponent({
	setup() {
		const gameStore = useGameStore();

		function clickToStart() {
			document.removeEventListener('click', clickToStart);
			new Audio('/src/assets/sounds/start.wav').play();
			gameStore.setStatus('loading');
		}

		document.addEventListener('click', clickToStart);

		return { gameStore, clickToStart };
	},
});
