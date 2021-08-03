import { defineComponent, ref, Ref, onMounted } from 'vue';
import Game from '../Game';

export default defineComponent({
	setup() {
		let game: Ref<Game | null> = ref(null);
		onMounted(() => {
			const canvas = document.getElementById(
				'scene'
			) as HTMLCanvasElement;
			if (!canvas) return alert('an error occurred.');

			game.value = new Game(canvas);
			game.value.start();
			game.value.status = 'home';
		});
		return { game };
	},
});
