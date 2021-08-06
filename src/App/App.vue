<template>
	<div id="game-container" class="absolute w-full h-full">
		<canvas id="scene" class="fixed w-full h-full"> </canvas>
		<Home v-if="gameStore.$state.game?.status === 'home'" />
		<Player />
	</div>
</template>

<style src="./App.css"></style>

<script src="./App" lang="ts"></script>
