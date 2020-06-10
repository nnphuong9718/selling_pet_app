import { createAction, mapType, status } from '../../../utils/reduxHelper';

export const types = {
    GET_LIST_PET: mapType('GET_LIST_PET', status.start),
    GET_LIST_PET_SUCCESS: mapType('GET_LIST_PET_SUCCESS', status.success),
    GET_LIST_PET_FAIL: mapType('GET_LIST_PET_FAIL', status.failure),
}

export const actions = {
    getListPet: createAction(types.GET_LIST_PET),
    getListPetSuccess: createAction(types.GET_LIST_PET_SUCCESS),
    getListPetFail: createAction(types.GET_LIST_PET_FAIL)
}