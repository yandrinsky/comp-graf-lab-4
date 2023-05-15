import Store from './Store';

export const save = () => {
    let state = Store.getState();

    let preparedStore = {
        __shapes: {},
        draggableCanvas: state.draggableCanvas,
        shift: state.shift
    };

    for (let key in state.__shapes) {
        let link = state.__shapes[key];
        preparedStore.__shapes[key] = {
            className: link.classList,
            x0: link.start.x,
            y0: link.start.y,
            x1: link.end?.x,
            y1: link.end?.y,
            x2: link.check?.x,
            y2: link.check?.y,
            uniqueId: link.id,
            type: link.type,
            text: link.text,
            id: link.userId,
            width: link.width,
            height: link.height,
            pointer: link.pointer,
            style: link.style
        };
    }

    return JSON.stringify(preparedStore);
};
