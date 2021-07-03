import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import { InitialFeedback } from './forms';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })          
        }),
        applyMiddleware(thunk, logger)     //COMBINE REDUCERS
    );

    return store;
}