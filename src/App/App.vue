<template>
	<div id="game-container" class="absolute w-full h-full">
		<canvas id="scene" class="fixed w-full h-full"> </canvas>
		<!-- <Home v-if="store.game?.status === 'home'" />
		{{ store.game }} -->
		{{ store }}
	</div>
</template>

<style src="./App.css"></style>

<script src="./App" lang="ts"></script>
