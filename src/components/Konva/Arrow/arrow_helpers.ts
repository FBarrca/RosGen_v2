

interface Point {
    x: number;
    y: number;
}

// Angle between A and B in degrees from thhe perspective of A
export function getAngle(A: Point, B: Point): number {
    const dx: number = B.x - A.x;
    const dy: number = B.y - A.y;
    return Math.atan2(dy, dx);
}

// Point on the surface of an ellipse given the center, radii, and angle(radians)
export function getPointOnEllipse(a: number, b: number, centerX: number, centerY: number, angle: number): Point {
    // Calculate the eccentric anomaly
    const eccentricAnomaly: number = angle + 0.5*(1 - Math.pow((b/a),2)) * Math.sin(2*angle);

    // Calculate the coordinates
    const x: number = centerX + a * Math.cos(eccentricAnomaly);
    const y: number = centerY + b * Math.sin(eccentricAnomaly);

    return {x, y};
}

// Point on the surface of an rect given the center, sides, and angle(radians)
export function getPointOnRectangle(w: number, h: number, centerX: number, centerY: number, theta: number): Point {

    // Determine the angle's quadrant
    const rectHalfWidth: number = w / 2;
    const rectHalfHeight: number = h / 2;
    
    let x: number, y: number;
    
    // Handle the special cases where the angle is a multiple of Pi/2.
    if (theta % (Math.PI / 2) === 0) {
        const quad = theta / (Math.PI / 2) % 4;
        switch (quad) {
            case 0:  // right
                return { x: centerX + rectHalfWidth, y: centerY };
            case 1:  // top
                return { x: centerX, y: centerY - rectHalfHeight };
            case 2:  // left
                return { x: centerX - rectHalfWidth, y: centerY };
            case 3:  // bottom
                return { x: centerX, y: centerY + rectHalfHeight };
        }
    }
    
    // For other angles, compute based on tan or cotan of the angle.
    const tanTheta: number = Math.tan(theta);
    const cotTheta: number = 1 / tanTheta;
  
    if (Math.abs(tanTheta) <= rectHalfHeight / rectHalfWidth) {
        // Intersects the left or right edge
        x = centerX + (Math.cos(theta) > 0 ? -rectHalfWidth : rectHalfWidth);
        y = centerY  -(x - centerX) * tanTheta;
    } else {
        // Intersects the top or bottom edge
        y = centerY + (Math.sin(theta) > 0 ? rectHalfHeight : -rectHalfHeight);
        x = centerX + -(y - centerY) * cotTheta;
    }

    return { x, y };
}