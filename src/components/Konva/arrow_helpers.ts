

interface Point {
    x: number;
    y: number;
}

// Angle between A and B in degrees from thhe perspective of A
function getAngle(A: Point, B: Point): number {
    const dx: number = B.x - A.x;
    const dy: number = B.y - A.y;
    return Math.atan2(dy, dx);
}

// Point on the surface of an ellipse given the center, radii, and angle(radians)
function getPointOnEllipse(a: number, b: number, centerX: number, centerY: number, angle: number): Point {

    // Calculate the coordinates
    const x: number = centerX + a * Math.cos(angle);
    const y: number = centerY + b * Math.sin(angle);

    return {x, y};
}
// Point on the surface of an rect given the center, sides, and angle(radians)
function getPointOnRectangle(w: number, h: number, centerX: number, centerY: number, theta: number): Point {

    // Determine the angle's quadrant
    const rectHalfWidth: number = w / 2;
    const rectHalfHeight: number = h / 2;
    const tanTheta: number = Math.tan(theta);
    const cotTheta: number = 1 / tanTheta;
  
    let x: number, y: number;
    if (Math.abs(tanTheta) <= rectHalfHeight / rectHalfWidth) {
        // Intersects the left or right edge
        x = centerX + (Math.cos(theta) > 0 ? rectHalfWidth : -rectHalfWidth);
        y = centerY + (x - centerX) * tanTheta;
    } else {
        // Intersects the top or bottom edge
        y = centerY + (Math.sin(theta) > 0 ? rectHalfHeight : -rectHalfHeight);
        x = centerX + (y - centerY) * cotTheta;
    }

    return { x, y };
}