import { isStraightCollision } from './isStraightCollision';
import { getAnotherCoordinateOfStraight } from '../line/get-another-coordinate-of-straight';
import { doesDotBelongToLine } from '../line/does-dot-belong-to-line';

export const getLineCollisionCoordinates = (equation1, equation2) => {
    if (!isStraightCollision(equation1, equation2)) {
        return null;
    }

    //прямые вкертикальные => параллельны
    if (equation1.x !== null && equation2.x !== null) {
        return null;
    }

    const x =
        equation1.b !== null && equation2.b !== null
            ? (equation2.b - equation1.b) / (equation1.k - equation2.k)
            : equation1.x ?? equation2.x;

    const y = getAnotherCoordinateOfStraight({
        equation: equation1.x === null ? equation1 : equation2,
        x
    });

    const isBelong1 = doesDotBelongToLine({ x, y, equation: equation1 });
    const isBelong2 = doesDotBelongToLine({ x, y, equation: equation2 });

    if (!isBelong1 || !isBelong2) {
        return null;
    }

    return { x, y };
};
