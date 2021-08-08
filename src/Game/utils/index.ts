import { PerspectiveCamera, Mesh, Group } from 'three';

export function findBounds(camera: PerspectiveCamera, obj: Mesh | Group, distance?: number) {
	const y = Math.tan(((camera.fov / 180) * Math.PI) / 2) * (distance ?? camera.position.distanceTo(obj.position));

	return {
		x: y * camera.aspect,
		y: y,
	};
}

export function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number) {
	var nv = Math.max(Math.min(v, vmax), vmin);
	var dv = vmax - vmin;
	var pc = (nv - vmin) / dv;
	var dt = tmax - tmin;
	var tv = tmin + pc * dt;
	return tv;
}
