// Reducter
import {stateinit} from './state.js';

export const changeUpdate = function(state = stateinit, action) {
    switch (action.type) {
        case 'getDisSupplier':
            return {update: action.text.update, area: action.text.area, type: action.text.type}
        case 'changeKeyword': 
            return {keyword: action.text}
        default:
            return state
    }
}