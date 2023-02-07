// Given an angle in degrees, returns an equivalent angle from 0 to 360 degrees
export function normalizeAngle(angle: number): number {
	const remainder = angle % 360;
	return remainder < 0 ? remainder + 360 : remainder;
}

// Given two angles in degrees, returns the smallest angle between them.
// It also accounts for direction.
export function getAngleDifference(angle1: number, angle2: number): number {
	const clockwiseDiff = normalizeAngle(angle2 - angle1);
	const counterClockwiseDiff = 360 - clockwiseDiff;
	return clockwiseDiff < counterClockwiseDiff ? clockwiseDiff : -counterClockwiseDiff;
}

export function round(value: number, precision: number): number {
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}
