import { actions, useDispatch, useStore } from "../context/userStore"
import useNotify from "./useNotify"
import axios from "axios";



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
        dispatch({ type: actions.ID_OF_BUILDING, payload: id });
    }

    //func for opening and closing edit building modal
    const editBuildingModal = (state: boolean, id: string, data: object) => {
        dispatch({ type: actions.EDIT_BUILDING_MODAL, payload: state });
        dispatch({ type: actions.ID_OF_BUILDING, payload: id });
        dispatch({ type: actions.GET_ONE_BUILDING, payload: data });
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


    //func to set first building data to map 
    const setFirstMapData = () => {

        let firstBuildingData = store.buildings[0]
        let options: object = {
            method: 'GET',
            url: 'https://google-maps-geocoding-plus.p.rapidapi.com/geocode',
            params: { address: firstBuildingData?.country, language: 'en' },
            headers: {
                'x-rapidapi-host': 'google-maps-geocoding-plus.p.rapidapi.com',
                'x-rapidapi-key': '818efab5b0msh30dc169df07653ap1234e4jsnf5e33276dd62'
            }
        };

        axios(options).then((response) => {
            dispatch({ type: actions.MAP_INFO_DATA, payload: response.data?.response?.place })
        }).catch(function (error) {
            console.error(error);
        });
    }

    //func to set building data to map 
    const setMapData = (data: any) => {
        let options: object = {
            method: 'GET',
            url: 'https://google-maps-geocoding-plus.p.rapidapi.com/geocode',
            params: { address: data, language: 'en' },
            headers: {
                'x-rapidapi-host': 'google-maps-geocoding-plus.p.rapidapi.com',
                'x-rapidapi-key': '818efab5b0msh30dc169df07653ap1234e4jsnf5e33276dd62'
            }
        };

        axios(options).then((response) => {
            dispatch({ type: actions.MAP_INFO_DATA, payload: response.data?.response?.place })
        }).catch(function (error) {
            console.error(error);
        });
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

    //func to get a single user buildings
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

        localStorage.setItem("userData", JSON.stringify(nowSave))
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
        getSingelUserBuilding(userdData.id)
    }


    //func to delete  buildings
    const deleteBuilding = () => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let allUersData: any = JSON.parse(storageData)
        let userdData = store.singelUserData
        let userBuiding = store.buildings

        let filteredUserBuiding = userBuiding.filter((data: any) => store.idOfBuilding === data.id ? data === userBuiding : data)
        dispatch({ type: actions.GET_BUILDINGS, payload: filteredUserBuiding })
        userdData.buildings = filteredUserBuiding

        let dataToUpdate = allUersData.findIndex(((data: any) => data.id === userdData.id));
        let updateData = allUersData[dataToUpdate].buildings = userdData
        let filtered = allUersData.filter((data: any) => userdData.id === data.id ? data === userdData : data)
        let nowSave = filtered.concat([updateData])

        localStorage.setItem("userData", JSON.stringify(nowSave))
        setTimeout(() => dispatch({ type: actions.LOADING, payload: false }), 1000)
        getSingelUserBuilding(userdData.id)
    }

    //func to  edit  buildings
    const editBuilding = (data: object) => {
        dispatch({ type: actions.LOADING, payload: true })
        let storageData: any = localStorage.getItem('userData')
        let allUersData: any = JSON.parse(storageData)
        let userdData = store.singelUserData
        let userBuiding = store.buildings

        let filteredUserBuiding = userBuiding.filter((data: any) => store.idOfBuilding === data.id ? data === userBuiding : data)
        dispatch({ type: actions.GET_BUILDINGS, payload: filteredUserBuiding })
        userdData.buildings = filteredUserBuiding
        userdData.buildings.push(data)

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
        editBuildingModal,
        editBuilding,
        setFirstMapData,
        setMapData,
        loading: store.loading,
        userData: store.usersData,
        addUserModalState: store.addUserModal,
        addBuildingModalState: store.addBuildingModal,
        deleteBuildingModalState: store.deleteBuildingModal,
        editBuildingModalState: store.editBuildingModal,
        singelUserData: store.singelUserData,
        userBuildings: store.buildings,
        oneBuilding: store.oneBuilding,
        idOfBuilding: store.idOfBuilding,
        mapInfoData: store.mapInfoData
    }
}
export default useUser