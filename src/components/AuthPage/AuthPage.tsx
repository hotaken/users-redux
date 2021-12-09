import React from 'react';
import { useSnackbar } from 'notistack';
import { StoreType } from '../../store';
import './AuthPage.css';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface IProps {
    users: StoreType['users'];
}

interface IFormInputs {
    nickname: string;
    password: string;
}

const AuthPage = (props: IProps): JSX.Element => {
    const { users } = props;
    const { handleSubmit, control, formState, reset, resetField } = useForm<IFormInputs>({
        defaultValues: { nickname: '', password: '' },
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onSubmitHandler = (data: IFormInputs) => {
        let userFind = false;
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            if (element.name === data.nickname) {
                userFind = true;
                if (element.password === data.password) {
                    reset();
                    const notification = enqueueSnackbar('You are authorized now', {
                        variant: 'success',
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                        onClick: () => closeSnackbar(notification),
                    });
                } else {
                    resetField('password');
                    const notification = enqueueSnackbar('Wrong password', {
                        variant: 'error',
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                        onClick: () => closeSnackbar(notification),
                    });
                }
            }
        }
        if (!userFind) {
            reset();
            // reset();
            const notification = enqueueSnackbar('Wrong nickname', {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                onClick: () => closeSnackbar(notification),
            });
        }
    };
    const authUserForm = (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="auth-page__form">
                <p>AUTHORIZE</p>
                <div className="auth-page__input">
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="nickname"
                                variant="outlined"
                                error={!!formState.errors?.nickname?.message}
                                helperText={formState.errors?.nickname?.message}
                                {...field}
                                className="auth-page__input"
                            />
                        )}
                        name="nickname"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Nickname is required' },
                        }}
                        defaultValue=""
                    />
                </div>
                <div className="auth-page__input">
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="password"
                                variant="outlined"
                                error={!!formState.errors?.password?.message}
                                helperText={formState.errors?.password?.message}
                                {...field}
                                className="auth-page__input"
                            />
                        )}
                        name="password"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Password is required' },
                        }}
                        defaultValue=""
                    />
                </div>
                <button type="submit">Continue</button>
            </div>
        </form>
    );

    return <div className="auth-page">{authUserForm}</div>;
};

const mapStateToProps = (state: StoreType) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps)(AuthPage);
