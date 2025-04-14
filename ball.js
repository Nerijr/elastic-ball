function getBall(radius, segments) {
    let positions = [];
    positions.push(vec2(0.0, 0.0));

    for (let i = 0; i <= segments; i++) {
        const angle = (2 * Math.PI * i) / segments;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        positions.push(vec2(x, y));
    }

    return positions;
}