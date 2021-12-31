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

    //func for opening and closing adding building modal
    const addBuildingModal = (state: boolean,) => {
        dispatch({ type: actions.ADD_BUILDING_MODAL, payload: state });
    }

    //func for opening and closing delete building modal
    const deleteBuildingModal = (state: boolean, id: string) => {
        dispatch({ type: actions.DELETE_BUILDING_MODAL, payload: state });
        dispatch({ type: actions.ID_OF_BUILDING_TOBE_DELETED, payload: id });
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
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
        // setTimeout(() => useShowNotify("User added successfully", "success"), 3000)
        window.location.reload();
    }

    //func to get all  user from loacl storage
    const getAllUsers = () => {
        let storageData: any = localStorage.getItem('userData')
        let userData: any = JSON.parse(storageData)
        dispatch({ type: actions.GET_ALL_USERS, payload: userData })
    }

    //func to get a singel user buildings
    const getSingelUserBuilding = (id: string) => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let usersData: any = JSON.parse(storageData)
        usersData.map((data: any) => (id === data.id ? dispatch({ type: actions.GET_SINGEL_USER, payload: data }) : null));
        usersData.map((data: any) => (id === data.id ? dispatch({ type: actions.GET_BUILDINGS, payload: data.buildings }) : null));
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
    }

    //func to get a singel user buildings
    const addBuilding = (data: object) => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let allUersData: any = JSON.parse(storageData)
        let userdData = store.singelUserData
        let userBuiding = store.buildings
        userBuiding.push(data)
        let dataToUpdate = allUersData.findIndex(((data: any) => data.id == userdData.id));
        let updateData = allUersData[dataToUpdate].buildings = userdData
        let filtered = allUersData.filter((data: any) => userdData.id === data.id ? data === userdData : data)
        let nowSave = filtered.concat([updateData])
        console.log(nowSave)
        localStorage.setItem("userData", JSON.stringify(nowSave))
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
        getSingelUserBuilding(userdData.id)
    }


    //func to get a delete  buildings
    const deleteBuilding = () => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let allUersData: any = JSON.parse(storageData)
        let userdData = store.singelUserData
        let userBuiding = store.buildings

        let filteredUserBuiding = userBuiding.filter((data: any) => store.idOfBuildingToBeDeleted === data.id ? data === userBuiding : data)
        dispatch({ type: actions.GET_BUILDINGS, payload: filteredUserBuiding })
        userdData.buildings = filteredUserBuiding
     

        console.log( userdData )

        let dataToUpdate = allUersData.findIndex(((data: any) => data.id === userdData.id));
        let updateData = allUersData[dataToUpdate].buildings = userdData
        let filtered = allUersData.filter((data: any) => userdData.id === data.id ? data === userdData : data)
        let nowSave = filtered.concat([updateData])

        localStorage.setItem("userData", JSON.stringify(nowSave))
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
        getSingelUserBuilding(userdData.id)
    }

    return {
        addUserModal,
        addBuildingModal,
        deleteBuildingModal,
        addUserToStorage,
        getAllUsers,
        getSingelUserBuilding,
        addBuilding,
        deleteBuilding,
        loading: store.loading,
        userData: store.usersData,
        addUserModalState: store.addUserModal,
        addBuildingModalState: store.addBuildingModal,
        deleteBuildingModalState: store.deleteBuildingModal,
        singelUserData: store.singelUserData,
        userBuildings: store.buildings,
        idOfBuildingToBeDeleted: store.idOfBuildingToBeDeleted,
    }
}
export default useUser