import { getCoordinates } from '../geometry';

export const doesDotBelongToLine = ({ x, y, equation }) => {
    if (equation.x !== null) {
        if (x !== equation.x) {
            return null;
        }

        if (y > Math.max(equation.y1, equation.y2) || y < Math.min(equation.y1, equation.y2)) {
            return null;
        }

        return true;
    }

    return getCoordinates(equation, x)?.toFixed(1) === y.toFixed(1);
};
