import { useState } from "react";
import { actions, useDispatch, useStore } from "../context/userStore"
import useNotify from "./useNotify"


const useUser = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const { useShowNotify } = useNotify()


    //func for opening and closing adding user modal
    const addUserModal = (state: boolean) => {
        dispatch({ type: actions.ADD_USER_MODAL, payload: state });
    }

    //func to add user to loacl storage
    const addUserToStorage = (newData: any) => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let oldData: any = JSON.parse(storageData)
        if (localStorage.getItem('userData')) {
            let savingData = oldData.concat(newData)
            localStorage.setItem("userData", JSON.stringify(savingData))
        } else {
            localStorage.setItem("userData", JSON.stringify(newData))
        }
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 5000)
        setTimeout(() => useShowNotify("User added successfully", "success"), 5000)

    }

    //func to get all  user from loacl storage
    const getAllUsers = () => {
        let storageData: any = localStorage.getItem('userData')
        let userData: any = JSON.parse(storageData)
        dispatch({ type: actions.GET_ALL_USERS, payload: userData })
    }


    return {
        addUserModal,
        addUserToStorage,
        getAllUsers,
        loading: store.loading,
        userData: store.usersData,
        addUserModalState: store.addUserModal,
    }
}
export default useUser