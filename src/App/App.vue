<template>
	<div id="game-container" class="absolute w-full h-full">
		<Player />
		<canvas id="scene" class="fixed w-full h-full"> </canvas>
		<transition name="fade">
			<Home v-if="gameStore.$state.game?.status === 'home'" />
		</transition>
	</div>
</template>

<style src="./App.css"></style>

<script src="./App" lang="ts"></script>
