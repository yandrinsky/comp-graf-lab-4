import Store from './Store';
import Line from './link-templates/Line';
import Circle from './link-templates/Circle';
import Text from './link-templates/Text';
import Rectangle from './link-templates/Rectangle';
import Shape from './Engine/Shape';
import { render } from './interface';

export const recover = data => {
    Store.state = { ...Store.createState(), ...JSON.parse(data) };

    for (let key in Store.state.__shapes) {
        let oldLink = Store.state.__shapes[key];
        let link = oldLink;
        let pointer = link.pointer;

        //ToDo поменять на нормальные вызовы createLine,
        if (link.type === 'line') link = new Line({ ...link });
        else if (link.type === 'circle') link = new Circle({ ...link });
        else if (link.type === 'text') link = new Text({ ...link });
        else if (link.type === 'rect') link = new Rectangle({ ...link });

        for (let key in oldLink.style) {
            link.style[key] = oldLink.style[key];
        }

        Store.state.__shapes[key] = link;
        Store.state.shapes[key] = new Shape(link, key);
        Store.state.shapes[key].pointer = pointer;
    }

    render();
};
