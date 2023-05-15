export const isStraightCollision = (equation1, equation2) => {
    if (equation1.x !== null && equation2.x !== null) {
        return false;
    }

    if (equation1.x === null && equation2.x === null) {
        return equation1.k - equation2.k !== 0;
    }

    return true;
};
