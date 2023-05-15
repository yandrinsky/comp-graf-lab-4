import { getLineCollisionCoordinates } from '../../geometry/collision/getLineCollisionCoordinates';
import { querySelectorAll } from '../../../interface';

export const getDotsOfLineCellsCollision = line => {
    const intersectionXDots = [];
    const intersectionYDots = [];

    querySelectorAll('.__renderCellLineX').forEach(cellLine => {
        const res = getLineCollisionCoordinates(
            cellLine.system.getEquation(),
            line.system.getEquation()
        );

        if (res) {
            intersectionXDots.push(res);
        }
    });

    querySelectorAll('.__renderCellLineY').forEach(cellLine => {
        const res = getLineCollisionCoordinates(
            cellLine.system.getEquation(),
            line.system.getEquation()
        );

        if (res) {
            intersectionYDots.push(res);
        }
    });

    return { xDots: intersectionXDots, yDots: intersectionYDots };
};
