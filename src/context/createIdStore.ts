import Store from './Store';

const initial_state = {
    id: ""
}

const reducer = (state: any, action: any) => {
    switch (action.type) {

        case actions.CREATE_UUID:
            return {
                ...state,
                id: action.payload,
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
    CREATE_UUID: 'CREATE_UUID',
};
