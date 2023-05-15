import mouseMoveEngine from './Engine/events-engine/mouseMoveEngine';
import { mouseClickEngine } from './Engine/events-engine/mouse-click-engine/mouse-click-engine';

import { dragCanvas } from './Engine/dragCanvas';
import { render } from './Engine/render';
import Store from './Store';

import { collision } from './Engine/geometry/geometry';
import { StyleEngine } from './Engine/styleEngine';

import { preventRender } from './library/prevent-render';
import { CSS } from './css';
import { getLineCollisionCoordinates } from './Engine/geometry/collision/getLineCollisionCoordinates';
import {
    combineRender,
    createLine,
    createText,
    createCircle,
    createRect,
    getCanvas,
    getElementByUniqueId,
    getLayout,
    getState,
    querySelector,
    querySelectorAll,
    save
} from './interface';
import { recover } from './recover';

export class CNV {
    constructor({ context, canvas, css = {}, settings = {} }) {
        Store.initState();
        this.getState = () => Store.getState();

        Store.state.context = context;
        Store.state.canvas = canvas;
        Store.state.styleEngine = new StyleEngine({ css: { ...CSS, ...css } });
        Store.state.draggableCanvas = !!settings.draggableCanvas;
        Store.state.draggableCanvasObserver = settings.observer;
        Store.state.userState = {};

        this.start();
    }

    start() {
        dragCanvas();

        Store.state.canvas.addEventListener('mousemove', mouseMoveEngine);
        Store.state.canvas.addEventListener('click', mouseClickEngine);
        Store.state.canvas.addEventListener('mousedown', mouseClickEngine);
        Store.state.canvas.addEventListener('mouseup', mouseClickEngine);

        Store.state.layout = this.createRect({
            x0: 0,
            y0: 0,
            width: Store.state.canvas.clientWidth,
            height: Store.state.canvas.clientHeight,
            className: '__layout'
        });

        this.render();
    }

    // __prepareRenderCell() {
    //     for (let i = 0; i < 10; i++) {
    //         this.combineRender(() => {
    //             this.createLine({
    //                 x0: (Store.state.canvas.clientWidth / 10) * i,
    //                 y0: 0,
    //                 x1: (Store.state.canvas.clientWidth / 10) * i,
    //                 y1: Store.state.canvas.clientHeight,
    //                 className: ['__renderCellLineX', '__noRender1']
    //             });
    //
    //             this.createLine({
    //                 x0: 0,
    //                 y0: (Store.state.canvas.clientHeight / 10) * i,
    //                 x1: Store.state.canvas.clientWidth,
    //                 y1: (Store.state.canvas.clientHeight / 10) * i,
    //                 className: ['__renderCellLineY', '__noRender1']
    //             });
    //         });
    //     }
    // }

    get settings() {
        return {
            set draggableCanvas(flag) {
                Store.state.draggableCanvas = !!flag;
            },
            set draggableCanvasObserver(observer) {
                Store.state.draggableCanvasObserver = observer;
            }
        };
    }

    querySelector = querySelector;
    querySelectorAll = querySelectorAll;
    getElementByUniqueId = getElementByUniqueId;

    createLine = createLine;
    createRect = createRect;
    createText = createText;
    createCircle = createCircle;

    render = render;

    get layout() {
        return getLayout();
    }

    lineCollision(line1, line2) {
        return collision(line1.system.getEquation(), line2.system.getEquation());
    }

    preventRender = preventRender;
    combineRender = combineRender;

    get canvas() {
        return getCanvas();
    }

    get state() {
        return getState();
    }

    save = save;
    recover = recover;
}
