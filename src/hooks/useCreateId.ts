import { v4 as uuid } from 'uuid';
import { actions, useDispatch, useStore } from "../context/createIdStore"

const useCreateId = () => {
    const store = useStore();
    const dispatch = useDispatch();

    //func to genarate uniq id
    const createId = () => {
        let data = uuid()
        dispatch({ type: actions.CREATE_UUID  , payload: data })
    }
    return {
        createId,
        uid: store.id
    }
}
export default useCreateId 