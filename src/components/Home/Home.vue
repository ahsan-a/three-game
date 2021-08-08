<template>
	<div>
		<img src="../../assets/logo/full.svg" alt="Aircraft Dash" class="mx-auto w-120 h-auto mt-16 logoImage" />
		<h1 class="text-center absolute bottom-1/5 w-full text-gray-300 text-4xl font-semibold jetbrains blink">Click to Start</h1>
	</div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');

.logoImage {
	filter: invert(80%) sepia(39%) saturate(1050%) hue-rotate(316deg) brightness(101%) contrast(91%) drop-shadow(0.5rem 0.5rem 0.3rem #e76f51);
}

.jetbrains {
	font-family: 'JetBrains Mono', monospace;
}

.blink {
	animation: blinker 1s linear infinite;
}

@keyframes blinker {
	50% {
		opacity: 0;
	}
}
</style>
