<template>
	<div id="game-container" class="absolute w-full h-full">
		<canvas id="scene" class="fixed w-full h-full"> </canvas>
		<Home v-if="game.status === 'home'" />
	</div>
</template>

<style src="./App.css"></style>

<script src="./App" lang="ts"></script>
