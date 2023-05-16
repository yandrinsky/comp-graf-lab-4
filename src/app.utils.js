export function clippingSegments(windowLines, lines) {
    // координаты окна
    const xLeft = windowLines[0].coordinates.start.x;
    const xRight = windowLines[0].coordinates.end.x;
    const yBottom = windowLines[1].coordinates.start.y;
    const yTop = windowLines[1].coordinates.end.y;

    let outsideLines = [];
    let insideLines = [];
    let collisionLines = [];

    for (let i = 0; i < lines.length; i++) {
        let xStart = lines[i].coordinates.start.x;
        let yStart = lines[i].coordinates.start.y;
        let xEnd = lines[i].coordinates.end.x;
        let yEnd = lines[i].coordinates.end.y;

        // тривиально невидимые отрезки
        if (
            (xStart < xLeft && xEnd < xLeft) ||
            (xStart > xRight && xEnd > xRight) ||
            (yStart < yBottom && yEnd < yBottom) ||
            (yStart > yTop && yEnd > yTop)
        ) {
            outsideLines.push(lines[i]);
        } else {
            // отрезки полностью попадающие в окно
            if (
                (xStart >= xLeft && xStart <= xRight) &&
                (yStart >= yBottom && yStart <= yTop) &&
                (xEnd >= xLeft && xEnd <= xRight) &&
                (yEnd >= yBottom && yEnd <= yTop)
            ) {
                insideLines.push(lines[i]);
            } else {
                // нетривиально невидимые или частично видимые отрезки
                let t = [
                    (xLeft - xStart) / (xEnd - xStart),
                    (xRight - xStart) / (xEnd - xStart),
                    (yBottom - yStart) / (yEnd - yStart),
                    (yTop - yStart) / (yEnd - yStart)
                ];
                let count = 0;
                let x,
                    y,
                    x1 = null,
                    y1 = null,
                    x2 = null,
                    y2 = null;

                for (let j = 0; j < 4; j++) {
                    if (0 <= t[j] && t[j] <= 1) {
                        // точка пересечения с прямой границы окна
                        x = xStart + (xEnd - xStart) * t[j];
                        y = yStart + (yEnd - yStart) * t[j];
                        // проверка на попадание в границы окна
                        if ((x >= xLeft && x <= xRight && j >=2) ||
                            (y >= yBottom && y <= yTop && j <= 1))
                        {
                            count++;
                            if (x1 === null && y1 === null) {
                                x1 = x;
                                y1 = y;
                            } else {
                                x2 = x;
                                y2 = y;
                            }
                        }
                    }
                }
                // Определение видимой части
                if (count === 1) {
                    if (xStart >= xLeft && xStart <= xRight &&
                        yStart >= yBottom && yStart <= yTop)
                    {
                        collisionLines.push({
                            start: { x: xStart, y: yStart },
                            end: { x: x1, y: y1 }
                        });
                    }
                    else {
                        collisionLines.push({
                            start: { x: x1, y: y1 },
                            end: { x: xEnd, y: yEnd }
                        });
                    }
                } else if (count === 2) {
                    collisionLines.push({
                        start: { x: x1, y: y1 },
                        end: { x: x2, y: y2 }
                    });
                }
                outsideLines.push(lines[i]);
            }
        }
    }

    return { outsideLines, insideLines, collisionLines };
}
