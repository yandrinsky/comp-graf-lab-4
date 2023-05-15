export const createFrame = ({ CNV }) => {
    CNV.createLine({
        x0: window.innerWidth / 2 - 200,
        y0: window.innerHeight / 2 - 200,
        x1: window.innerWidth / 2 + 200,
        y1: window.innerHeight / 2 - 200,
        className: 'frameLine',
        id: 'frameLine_0'
    });

    CNV.createLine({
        x0: window.innerWidth / 2 + 200,
        y0: window.innerHeight / 2 - 200,
        x1: window.innerWidth / 2 + 200,
        y1: window.innerHeight / 2 + 200,
        className: 'frameLine',
        id: 'frameLine_1'
    });

    CNV.createLine({
        x0: window.innerWidth / 2 + 200,
        y0: window.innerHeight / 2 + 200,
        x1: window.innerWidth / 2 - 200,
        y1: window.innerHeight / 2 + 200,
        className: 'frameLine',
        id: 'frameLine_2'
    });

    CNV.createLine({
        x0: window.innerWidth / 2 - 200,
        y0: window.innerHeight / 2 + 200,
        x1: window.innerWidth / 2 - 200,
        y1: window.innerHeight / 2 - 200,
        className: 'frameLine',
        id: 'frameLine_3'
    });

    CNV.createCircle({
        x0: window.innerWidth / 2 - 200,
        y0: window.innerHeight / 2 - 200,
        className: 'frameCircle',
        state: {
            connectedLines: [
                { way: 'start', line: CNV.querySelector('#frameLine_0') },
                { way: 'end', line: CNV.querySelector('#frameLine_3') }
            ]
        }
    });

    CNV.createCircle({
        x0: window.innerWidth / 2 + 200,
        y0: window.innerHeight / 2 - 200,
        className: 'frameCircle',
        state: {
            connectedLines: [
                { way: 'end', line: CNV.querySelector('#frameLine_0') },
                { way: 'start', line: CNV.querySelector('#frameLine_1') }
            ]
        }
    });

    CNV.createCircle({
        x0: window.innerWidth / 2 + 200,
        y0: window.innerHeight / 2 + 200,
        className: 'frameCircle',
        state: {
            connectedLines: [
                { way: 'end', line: CNV.querySelector('#frameLine_1') },
                { way: 'start', line: CNV.querySelector('#frameLine_2') }
            ]
        }
    });

    CNV.createCircle({
        x0: window.innerWidth / 2 - 200,
        y0: window.innerHeight / 2 + 200,
        className: 'frameCircle',
        state: {
            connectedLines: [
                { way: 'end', line: CNV.querySelector('#frameLine_2') },
                { way: 'start', line: CNV.querySelector('#frameLine_3') }
            ]
        }
    });

    CNV.querySelectorAll('.frameLine').forEach(line => {
        line.ondrag = e => {
            CNV.combineRender(() => {
                CNV.querySelectorAll('.frameLine').forEach(line => {
                    line.update.start.x = line.update.start.x + e.movementX;
                    line.update.start.y = line.update.start.y + e.movementY;

                    line.update.check.x = line.update.start.x;
                    line.update.check.y = line.update.start.y;

                    line.update.end.x = line.update.end.x + e.movementX;
                    line.update.end.y = line.update.end.y + e.movementY;
                });

                CNV.querySelectorAll('.frameCircle').forEach(circle => {
                    circle.update.start.x = circle.update.start.x + e.movementX;
                    circle.update.start.y = circle.update.start.y + e.movementY;
                });
            });
        };
    });

    const findResizeTo = ({ index, x, y, movement }) => {
        switch (index) {
            case 0:
                if (x && movement < 0) {
                    return 'bigger';
                } else if (x && movement > 0) {
                    return 'lower';
                } else if (y && movement < 0) {
                    return 'bigger';
                } else if (y && movement > 0) {
                    return 'lower';
                }
            case 1:
                if (x && movement < 0) {
                    return 'lower';
                } else if (x && movement > 0) {
                    return 'bigger';
                } else if (y && movement < 0) {
                    return 'bigger';
                } else if (y && movement > 0) {
                    return 'lower';
                }
            case 2:
                if (x && movement < 0) {
                    return 'lower';
                } else if (x && movement > 0) {
                    return 'bigger';
                } else if (y && movement < 0) {
                    return 'lower';
                } else if (y && movement > 0) {
                    return 'bigger';
                }

            case 3:
                if (x && movement < 0) {
                    return 'bigger';
                } else if (x && movement > 0) {
                    return 'lower';
                } else if (y && movement < 0) {
                    return 'lower';
                } else if (y && movement > 0) {
                    return 'bigger';
                }
        }
    };

    const dotResize = ({ resizeTo, movement, index }) => {
        const circle = CNV.querySelectorAll('.frameCircle')[index];
        let movementX;
        let movementY;

        switch (index) {
            case 0:
                if (resizeTo === 'bigger') {
                    movementX = -movement;
                    movementY = -movement;
                } else {
                    movementX = movement;
                    movementY = movement;
                }

                break;

            case 1:
                if (resizeTo === 'bigger') {
                    movementX = movement;
                    movementY = -movement;
                } else {
                    movementX = -movement;
                    movementY = movement;
                }

                break;

            case 2:
                if (resizeTo === 'bigger') {
                    movementX = movement;
                    movementY = movement;
                } else {
                    movementX = -movement;
                    movementY = -movement;
                }

                break;
            case 3:
                if (resizeTo === 'bigger') {
                    movementX = -movement;
                    movementY = movement;
                } else {
                    movementX = movement;
                    movementY = -movement;
                }

                break;
        }

        circle.update.start.x = circle.update.start.x + movementX;
        circle.update.start.y = circle.update.start.y + movementY;

        const [{ line: line1, way: way1 }, { line: line2, way: way2 }] =
            circle.state.connectedLines;

        line1.update[way1].x = line1.update[way1].x + movementX;
        line1.update[way1].y = line1.update[way1].y + movementY;

        line2.update[way2].x = line2.update[way2].x + movementX;
        line2.update[way2].y = line2.update[way2].y + movementY;
    };

    CNV.querySelectorAll('.frameCircle').forEach((circle, index) => {
        circle.ondrag = e => {
            const movementAbs = Math.max(Math.abs(e.movementX), Math.abs(e.movementY));

            if (movementAbs === 0) {
                return;
            }

            const realMovement =
                Math.abs(e.movementX) === movementAbs
                    ? { x: true, movement: e.movementX }
                    : { y: true, movement: e.movementY };

            const resizeTo = findResizeTo({
                index,
                x: realMovement.x,
                y: realMovement.y,
                movement: movementAbs
            });

            CNV.combineRender(() => {
                for (let i = 0; i < 4; i++) {
                    dotResize({ index: i, movement: realMovement.movement, resizeTo });
                }
            });
        };
    });
};
