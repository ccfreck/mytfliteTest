// Function to calculate angles between three points
// TODO: Utilize 3D angles
export function calculateAngle(a, b, c) {
	'worklet';
	if (a == undefined || b == undefined || c == undefined)
		return -1;

	// Define angles as arrays and calculate using atan2 for 2D
	a = [a['x'], a['y']];
	b = [b['x'], b['y']];
	c = [c['x'], c['y']];
	let radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);

	// Convert radians to degrees
	let angle = Math.abs(radians * 180.0 / Math.PI);

	// Ensure angle is between 0 and 180 degrees
	if (angle > 180.0)
		angle = 360 - angle;

	return angle;
}

// Function to compute primary angles (exercises include: pushups, pullups, squats)
// TODO: Investigate camera inverting with front-camera
export function computeAngles(landmarks) {
	'worklet';
	if (landmarks.length == 0) return {};
	let angles = {};

	angles["left_elbow"] = calculateAngle(landmarks["left_wrist"], landmarks["left_elbow"], landmarks["left_shoulder"]);
	angles["right_elbow"] = calculateAngle(landmarks["right_wrist"], landmarks["right_elbow"], landmarks["right_shoulder"]);
	angles["left_knee"] = calculateAngle(landmarks["left_hip"], landmarks["left_knee"], landmarks["left_ankle"]);
	angles["right_knee"] = calculateAngle(landmarks["right_hip"], landmarks["right_knee"], landmarks["right_ankle"]);
	angles["left_hip"] = calculateAngle(landmarks["left_shoulder"], landmarks["left_hip"], landmarks["left_knee"]);
	angles["right_hip"] = calculateAngle(landmarks["right_shoulder"], landmarks["right_hip"], landmarks["right_knee"]);

	return angles;
}

export function computeLandmarks(data) {
    'worklet';
    if (!Array.isArray(data) || data.length === 0) return {};

    let landmarks = {};
    const indices = {
        "nose": 0,
        "left_shoulder": 11,
        "right_shoulder": 12,
        "left_elbow": 13,
        "right_elbow": 14,
        "left_wrist": 15,
        "right_wrist": 16,
        "left_hip": 23,
        "right_hip": 24,
        "left_knee": 25,
        "right_knee": 26,
        "left_ankle": 27,
        "right_ankle": 28
    };

    for (const [key, index] of Object.entries(indices)) {
        if (data[index]) {
            landmarks[key] = {
                x: data[index]?.x ?? 0,
                y: data[index]?.y ?? 0,
                z: data[index]?.z ?? 0,
                visibility: data[index]?.visibility ?? 0,
                presence: data[index]?.presence ?? 0
            };
        }
    }

    return landmarks;
}

