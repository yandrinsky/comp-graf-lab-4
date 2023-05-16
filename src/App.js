import React, { useEffect } from 'react';
import { useInitial } from './app.hook';
import { clippingSegments } from './app.utils';
import { createFrame } from './frame';

export const App = () => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { CNV } = useInitial();

        function randomLinesGenerate(count = 1) {
            CNV.combineRender(() => {
                CNV.querySelectorAll('.testedLines').forEach(line => line.remove());

                for (let i = 0; i < count; i++) {
                    CNV.createLine({
                        x0: Math.floor(Math.random() * window.innerWidth),
                        y0: Math.floor(Math.random() * window.innerHeight),
                        x1: Math.floor(Math.random() * window.innerWidth),
                        y1: Math.floor(Math.random() * window.innerHeight),
                        className: 'testedLines'
                    });
                }
            });
        }

А
        randomLinesGenerate(20);

        const paintLines = () => {
            const res = clippingSegments(
                CNV.querySelectorAll('.frameLine'),
                CNV.querySelectorAll('.testedLines')
            );

            CNV.combineRender(() => {
                CNV.querySelectorAll('.green').forEach(line => line.remove())
                CNV.querySelectorAll('.testedLines').forEach(line => {
                    line.classList.remove('gray')
                    line.classList.remove('red')
                })

                res.outsideLines.forEach(line => line.classList.add('gray'));
                res.insideLines.forEach(line => line.classList.add('red'));

                res.collisionLines.forEach(({ start, end }) =>
                    CNV.createLine({ x0: start.x, y0: start.y, x1: end.x, y1: end.y, className: 'green' })
                );
            });
        }

        createFrame({ CNV, onFrameMove:  paintLines });

        paintLines();

    }, []);

    return (
        <div>
            <canvas id="canvas" width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
};
