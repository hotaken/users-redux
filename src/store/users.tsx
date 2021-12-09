type ADD_USER = 'ADD_USER';
type DELETE_USER = 'DELETE_USER';

export type UserType = {
    name: string;
    password: string;
};
interface IAddUserAction {
    type: ADD_USER;
    user: UserType;
}
interface IDeleteUserAction {
    type: DELETE_USER;
    index: number;
}
type ActionTypes = IAddUserAction | IDeleteUserAction;

export type addUserActionType = ({ user }: { user: UserType }) => IAddUserAction;

export const addUserAction: addUserActionType = ({ user }) => {
    return {
        type: 'ADD_USER',
        user,
    };
};

export type deleteUserActionType = ({ index }: { index: number }) => IDeleteUserAction;

export const deleteUserAction: deleteUserActionType = ({ index }) => {
    return {
        type: 'DELETE_USER',
        index,
    };
};

export type UserStateType = UserType[];
const InitialState: UserStateType = [];

const reducer = (state = InitialState, action: ActionTypes): UserType[] => {
    switch (action.type) {
        case 'ADD_USER': {
            const newState = [...state];
            newState.push(action.user);
            return newState;
        }
        case 'DELETE_USER': {
            const newState = [...state];
            newState.splice(action.index, 1);
            return newState;
        }
        default:
            return state;
    }
};

export default reducer;
