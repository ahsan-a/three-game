import { Game } from '../Game';

import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

interface State {
	game: Game | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
	state: {
		game: null,
	},
});

export const useStore = () => baseUseStore(key);

export default store;
