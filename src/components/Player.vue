<template>
	<div class="absolute bottom-3 right-3 bg-1 z-10 p-2 rounded-lg shadow-md transition-all" v-if="state.interracted">
		<div class="flex flex-row items-center mr-3">
			<img :src="state.current.image" class="w-20 h-auto rounded-md" />
			<div class="ml-3 mr-6">
				<h1 class="text-gray-50 text-xl font-semibold">{{ state.current.name }}</h1>
				<h1 class="text-sm text-gray-300 font-medium">{{ state.current.artist }}</h1>
			</div>
			<button class="mx-4 focus:outline-none" @click="music.pause()">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="text-gray-100 hover:text-gray-50 fill-current transition-colors"
				>
					<path d="M3 22v-20l18 10-18 10z" v-if="state.paused" />
					<path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" v-else />
				</svg>
			</button>
			<button class="focus:outline-none" @click="music.skip()">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="text-gray-100 hover:text-gray-50 fill-current transition-colors"
				>
					<path d="M0 19v-14l12 7-12 7zm12 0v-14l12 7-12 7z" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		let soundNames: Current[] = [
			{ name: 'Music Is', artist: 'Pryces', image: 'https://cdn.musicvine.com/images/pryces-avatar-v1.jpg' },
			{ name: 'All The Things You Love', artist: 'Soundroll', image: 'https://cdn.musicvine.com/images/soundroll-avatar.jpg' },
			{ name: 'Cosy', artist: 'Prigida', image: 'https://cdn.musicvine.com/images/prigida-avatar-v1_6180582698519834.jpg' },
			{ name: 'Glow', artist: 'SENSHO', image: 'https://cdn.musicvine.com/images/Sensho_Avatar_1955111997031914.jpg' },
			{ name: 'Coffee Break', artist: 'SENSHO', image: 'https://cdn.musicvine.com/images/Sensho_Avatar_1955111997031914.jpg' },
		].sort(() => (Math.random() > 0.5 ? 1 : -1));

		interface Current {
			name: string;
			artist: string;
			image?: string;
		}

		interface State {
			current: Current;
			paused: boolean;
			interracted: boolean;
			currentSound?: HTMLAudioElement;
		}
		const state: State = reactive({
			current: {
				name: '',
				artist: '',
				image: '',
			},
			paused: false,
			interracted: false,
		});

		document.addEventListener('click', musicPlay);

		let i = -1;
		let rootSoundPath = '/src/assets/music/';

		function playSound() {
			try {
				state.currentSound?.removeEventListener('ended', playSound);
			} catch {}
			i++;

			if (i == soundNames.length) {
				i = 0;
				soundNames = soundNames.sort(() => (Math.random() > 0.5 ? 1 : -1));
			}

			state.currentSound = new Audio(`${rootSoundPath}${soundNames[i].name}/audio.mp3`);
			state.current = soundNames[i];
			state.currentSound.addEventListener('ended', playSound);

			// if (localStorage.getItem('musicPaused') !== 'true') state.currentSound.play();
			state.currentSound.play();
			state.paused = !!state.currentSound?.paused;
		}

		function musicPlay() {
			setTimeout(() => {
				document.removeEventListener('click', musicPlay);
				state.interracted = true;
				playSound();
			}, 1000);
		}

		const music = {
			pause: () => {
				state.currentSound?.paused ? state.currentSound.play() : state.currentSound?.pause();
				state.paused = !!state.currentSound?.paused;

				localStorage.setItem('musicPaused', state.paused.toString());
			},
			skip: () => {
				state.currentSound?.pause();
				playSound();
			},
		};

		return { state, music };
	},
});
</script>
