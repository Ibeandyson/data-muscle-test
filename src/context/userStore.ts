import Store from './Store';

const initial_state = {
    loading: false,
    addUserModal: false,
    addBuildingModal: false,
    usersData: [],
    singelUserData: {},
    buildings: []
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
        case actions.ADD_BUILDING_MODAL:
            return {
                ...state,
                addBuildingModal: action.payload,
            };
        case actions.GET_ALL_USERS:
            return {
                ...state,
                usersData: action.payload,
            };
        case actions.GET_SINGEL_USER:
            return {
                ...state,
                singelUserData: action.payload,
                buildings: action.payload.buildings
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
    ADD_BUILDING_MODAL: 'ADD_BUILDING_MODAL',
    GET_ALL_USERS: 'GET_ALL_USERS',
    GET_SINGEL_USER: 'GET_SINGEL_USER'
};
