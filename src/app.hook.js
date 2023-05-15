import { CNV as CNV_lib } from './CNV_lib';
import { CSS as css } from './css';

export const useInitial = () => {
    let CNV;

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    CNV = new CNV_lib({
        canvas,
        context,
        css
    });

    CNV.getState().xShift = 0;
    CNV.getState().yShift = 0;

    return { CNV };
};
