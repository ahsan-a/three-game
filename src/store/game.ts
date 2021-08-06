import { defineStore } from 'pinia';
import { Game, Status } from '../Game';

export interface GameStore {
	game: null | Game;
	loaded: boolean;
}

export const useGameStore = defineStore({
	id: 'game',
	state: (): GameStore => ({
		game: null,
		loaded: false,
	}),
	actions: {
		setStatus(status: Status) {
			if (!this.$state.game) return;

			this.$state.game.status = status;

			switch (status) {
				case 'home':
					this.$state.game.initHome();
					break;
			}
		},
	},
});
