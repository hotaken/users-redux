import React from 'react';
import { useSnackbar } from 'notistack';
import { StoreDispatchType, StoreType } from '../../store';
import './ListPage.css';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import {
    addUserAction,
    addUserActionType,
    deleteUserAction,
    deleteUserActionType,
    UserType,
} from '../../store/users';
import CustomTable from './CustomTable';

interface IProps {
    users: StoreType['users'];
    addUser: addUserActionType;
    deleteUser: deleteUserActionType;
}

interface IFormInputs {
    nickname: string;
    password: string;
}

const ListPage = (props: IProps): JSX.Element => {
    const { users, addUser, deleteUser } = props;
    const { handleSubmit, control, formState, reset } = useForm<IFormInputs>({
        defaultValues: { nickname: '', password: '' },
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onSubmitHandler = (data: IFormInputs) => {
        let userFind = false;
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            if (element.name === data.nickname) {
                userFind = true;
                reset();
                const notification = enqueueSnackbar('User with such nickname exists', {
                    variant: 'error',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                    onClick: () => closeSnackbar(notification),
                });
            }
        }
        if (!userFind) {
            reset();
            addUser({ user: { name: data.nickname, password: data.password } });
            const notification = enqueueSnackbar('User added', {
                variant: 'success',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                onClick: () => closeSnackbar(notification),
            });
        }
    };
    const addUserForm = (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="list-page__form">
                <p>ADD USER</p>
                <div className="list-page__input">
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="nickname"
                                variant="outlined"
                                error={!!formState.errors?.nickname?.message}
                                helperText={formState.errors?.nickname?.message}
                                {...field}
                                className="list-page__input"
                            />
                        )}
                        name="nickname"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Nickname is required' },
                            minLength: {
                                value: 4,
                                message: 'Nickname must be 4 symbols or longer',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Nickname must be 20 symbols or shorter',
                            },
                        }}
                        defaultValue=""
                    />
                </div>
                <div className="list-page__input">
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="password"
                                variant="outlined"
                                error={!!formState.errors?.password?.message}
                                helperText={formState.errors?.password?.message}
                                {...field}
                                className="list-page__input"
                            />
                        )}
                        name="password"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Password is required' },
                            minLength: {
                                value: 6,
                                message: 'Password must be 6 symbols or longer',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Password must be 20 symbols or shorter',
                            },
                        }}
                        defaultValue=""
                    />
                </div>
                <button type="submit">Continue</button>
            </div>
        </form>
    );
    type UserRowType = {
        nickname: JSX.Element;
        password: JSX.Element;
        delete: JSX.Element;
    };
    const data = React.useMemo(() => {
        let userRowArr: UserRowType[] = [];
        users.forEach((user, index) => {
            const row = {
                nickname: <p>{user.name}</p>,
                password: <p>{user.password}</p>,
                delete: (
                    <button key={`${index}`} onClick={() => deleteUser({ index: index })}>
                        ❌
                    </button>
                ),
            };
            userRowArr.push(row);
        });
        return userRowArr;
    }, [users, deleteUser]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nickname',
                accessor: 'nickname',
            },
            {
                Header: 'Password',
                accessor: 'password',
            },
            {
                Header: 'Delete',
                accessor: 'delete',
            },
        ],
        [],
    ) as any;
    return (
        <div className="list-page">
            {addUserForm}
            {users.length > 0 ? (
                <CustomTable columns={columns} data={data} className="list-page__table" />
            ) : (
                <p>No users yet</p>
            )}
        </div>
    );
};

const mapStateToProps = (state: StoreType) => {
    return {
        users: state.users,
    };
};
const mapDispatchToProps = (dispatch: StoreDispatchType) => {
    return {
        addUser: ({ user }: { user: UserType }) => dispatch(addUserAction({ user })),
        deleteUser: ({ index }: { index: number }) => dispatch(deleteUserAction({ index })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
