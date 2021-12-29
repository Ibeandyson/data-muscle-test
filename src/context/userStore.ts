import  Store  from './Store';

const initial_state = {
    loading: false,
    addUserModal: false
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case actions.ADD_USER_MODAL:
            return {
                ...state,
                addUserModal: action.payload,
            };
        default:
            return state;
    }
};

export const { Provider, useStore, useDispatch } = Store(
    initial_state,
    reducer,
);

export const actions = {
    LOADING: 'LOADING',
    ADD_USER_MODAL: 'ADD_USER_MODAL',
};