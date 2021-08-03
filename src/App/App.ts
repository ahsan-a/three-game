import { defineComponent, ref, Ref, onMounted } from 'vue';
import { createGame, getGame } from '../Game';

import Home from '../components/Home/Home.vue';

export default defineComponent({
	components: {
		Home,
	},
	setup() {
		onMounted(() => {
			const canvas = document.getElementById(
				'scene'
			) as HTMLCanvasElement;
			if (!canvas) return alert('an error occurred.');

			const game = createGame(canvas);
			game.value.start();
			game.value.status = 'home';
		});
		return { game: getGame() };
	},
});
