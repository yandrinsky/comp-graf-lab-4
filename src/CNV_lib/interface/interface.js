import { querySelectorAllEngine, querySelectorEngine } from '../Engine/cssEngine/selecting';
import Store from '../Store';
import { preventRender } from '../library/prevent-render';
import { render } from '../Engine/render';

export const querySelector = selector => {
    return querySelectorEngine(selector, Store.state.__shapes, Store.state.shapes);
};

export const querySelectorAll = selector => {
    return querySelectorAllEngine(selector, Store.state.__shapes, Store.state.shapes);
};

export const getElementByUniqueId = id => {
    return Store.state.shapes[id];
};

export const getLayout = () => {
    return querySelector('.__layout');
};

export const combineRender = callback => {
    preventRender(callback);
    render();
};

export const getCanvas = () => Store.getState().canvas;
export const getState = () => Store.getState();
