import { render } from '../Engine/render';
import { ShapeWithHandles } from './Shape-with-handles';

export class Circle extends ShapeWithHandles {
    constructor(link) {
        super(link);
    }

    get update() {
        const link = this.link;

        return {
            get start() {
                return {
                    set x(x) {
                        link.start.x = x;
                        render();
                    },
                    set y(y) {
                        link.start.y = y;
                        render();
                    },
                    get x() {
                        return link.start.x;
                    },

                    get y() {
                        return link.start.y;
                    }
                };
            },

            get startPosition() {
                return {
                    set x(x) {
                        link.start.x = x;
                        render();
                    },
                    set y(y) {
                        link.start.y = y;
                        render();
                    },

                    get x() {
                        return link.start.x;
                    },

                    get y() {
                        return link.start.y;
                    }
                };
            }
        };
    }
}
