import { createAction } from '../../../utils/reduxHelper';

export const types = {
    GET_LIST_PET: 'GET_LIST_PET',
    GET_LIST_PET_SUCCESS: 'GET_LIST_PET_SUCCESS',
    GET_LIST_PET_FAIL: 'GET_LIST_PET_FAIL',
}

export const actions = {
    getListPet: createAction(types.GET_LIST_PET),
    getListPetSuccess: createAction(types.GET_LIST_PET_SUCCESS),
    getListPetFail: createAction(types.GET_LIST_PET_FAIL)
}