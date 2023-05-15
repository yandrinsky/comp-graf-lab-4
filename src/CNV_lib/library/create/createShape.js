import Store from '../../Store';

import Shape from '../../Engine/Shape';
import { render } from '../../Engine/render';

export const createShape = (link, ShapeClass) => {
    Store.state.__shapes[link.id] = link;
    let shape = ShapeClass ? new ShapeClass(link) : new Shape(link, link.id);

    Store.state.shapes[link.id] = shape;

    render();

    return shape;
};
