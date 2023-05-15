import { createShape } from './createShape';
import Circle from '../../link-templates/Circle';
import { Circle as CircleShape } from '../../shape-templates/Circle';

export const createCircle = config => {
    let link = new Circle(config);
    return createShape(link, CircleShape);
};
