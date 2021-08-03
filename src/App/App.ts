import { defineComponent, ref, Ref, onMounted } from 'vue';
import { createGame, Game } from '../Game';

import { useStore } from '../store';

import Home from '../components/Home/Home.vue';

export default defineComponent({
	components: {
		Home,
	},
	setup() {
		const store = useStore();
		onMounted(() => {
			const canvas = document.getElementById('scene') as HTMLCanvasElement;
			if (!canvas) return alert('an error occurred.');
			createGame(canvas);
			store.state.game = store.state.game as Game;
			store.state.game.start();
			store.state.game.status = 'home';
		});

		return { store };
	},
});
