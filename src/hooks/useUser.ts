import { useState } from "react";
import { actions, useDispatch, useStore } from "../context/userStore"



const useUser = () => {
    const store = useStore();
    const dispatch = useDispatch();

    //func for opening and closing adding user modal
    const addUserModal = (state: boolean) => {
        dispatch({ type: actions.ADD_USER_MODAL, payload: state });
    }

    return {
        addUserModal,
        addUserModalState: store.addUserModal,
    }
}
export default useUser