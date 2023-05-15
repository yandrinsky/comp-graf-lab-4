export const getCellsByDots = ({ pointsX, pointsY, x0, y0, width, height }) => {
    const finalSize = { x: width, y: height };

    const searchArea = {
        x: [0, width],
        y: [0, height]
    };

    const cellsXStep = finalSize.x / 10;
    const cellsYStep = finalSize.y / 10;

    const cluster = {};

    const foundCell = dot => {
        if (dot.x < searchArea.x[0] || dot.x > searchArea.x[1]) {
            return null;
        }

        if (dot.y < searchArea.y[0] || dot.y > searchArea.y[1]) {
            return null;
        }

        const cellX = Math.floor((dot.x - searchArea.x[0]) / cellsXStep);
        const cellY = Math.floor((dot.y - searchArea.y[0]) / cellsYStep);

        // console.log(dot.x, searchArea.x[0], cellsStep);
        // console.log(cellX, cellY);

        if (cellX > 9 || cellY > 9) {
            return null;
        }

        return { i: cellX, j: cellY };
    };

    const sort = arr => {
        return arr.sort((a, b) => {
            if (a.j !== b.j) {
                return a.j - b.j;
            } else {
                return a.i - b.i;
            }
        });
    };

    pointsX.forEach(({ x, y }) => {
        const res = foundCell({ x, y });

        if (res !== null) {
            [res, { i: res.i - 1, j: res.j }].forEach(res => {
                if (cluster[`${res.j}${res.i}`]) {
                    cluster[`${res.j}${res.i}`].count += 1;
                } else {
                    cluster[`${res.j}${res.i}`] = { j: res.j, i: res.i, count: 1 };
                }
            });
        }
    });

    pointsY.forEach(({ x, y }) => {
        const res = foundCell({ x, y });

        if (res !== null) {
            [res, { i: res.i, j: res.j - 1 }].forEach(res => {
                if (cluster[`${res.j}${res.i}`]) {
                    cluster[`${res.j}${res.i}`].count += 1;
                } else {
                    cluster[`${res.j}${res.i}`] = { j: res.j, i: res.i, count: 1 };
                }
            });
        }
    });

    return sort(Object.values(cluster));
};
