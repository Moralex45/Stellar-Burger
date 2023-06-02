import { 
    SET_PROFILE,
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    SET_PASSWORD_REQUEST,
    SET_PASSWORD_SUCCESS,
    SET_PASSWORD_FAILED,
    REGISTSTRATION_REQUEST,
    REGISTSTRATION_SUCCESS,
    REGISTSTRATION_FAILED,
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILED,
    SEND_PROFILE_DATA_REQUEST,
    SEND_PROFILE_DATA_SUCCESS,
    SEND_PROFILE_DATA_FAILED,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    TProfileActions 
} from '../actions/profileActions';

import { profileReducer, initialState } from './profileReducer'

describe('Profile - редьюсер и экшены', () => {
    
    test('initial state', () => {
        expect(profileReducer(undefined, {} as any)).toEqual(initialState);
    });

    test('should handle SET_PROFILE', () => {
        expect(profileReducer(initialState, { type: SET_PROFILE, payload: {
            name: 'Jack Maxwell',
            email: 'orion255@anotherfakeemailserver.net'
          } })).toEqual({
            ...initialState,
            profile: {
                name: 'Jack Maxwell',
                email: 'orion255@anotherfakeemailserver.net'
              }
        });
    });

    test('should handle RESET_PASSWORD_REQUEST', () => {
        expect(profileReducer(initialState, { type: RESET_PASSWORD_REQUEST  })).toEqual({
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false
        });
    });

    test('should handle RESET_PASSWORD_FAILED', () => {
        expect(profileReducer(initialState, { type: RESET_PASSWORD_FAILED  })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true
        });
    });

    test('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(profileReducer(initialState, { type: RESET_PASSWORD_SUCCESS, payload: true  })).toEqual({
            ...initialState,
            resetPasswordAnswer: true
        });
    });

    test('should handle SET_PASSWORD_REQUEST', () => {
        expect(profileReducer(initialState, { type: SET_PASSWORD_REQUEST })).toEqual({
            ...initialState,
            setPasswordRequest: true,
            setPasswordFailed: false
        });
    });

    test('should handle SET_PASSWORD_SUCCESS', () => {
        expect(profileReducer(initialState, { type: SET_PASSWORD_SUCCESS, payload: true })).toEqual({
            ...initialState,
            setPasswordAnswer: true
        });
    });

    test('should handle SET_PASSWORD_FAILED', () => {
        expect(profileReducer(initialState, { type: SET_PASSWORD_FAILED })).toEqual({
            ...initialState,
            setPasswordRequest: false,
            setPasswordFailed: true
        });
    });

    test('should handle REGISTSTRATION_REQUEST', () => {
        expect(profileReducer(initialState, { type: REGISTSTRATION_REQUEST })).toEqual({
            ...initialState,
            registrationRequest: true,
            registrationFailed: false
        });
    });

    test('should handle REGISTSTRATION_SUCCESS', () => {
        expect(profileReducer(initialState, { type: REGISTSTRATION_SUCCESS, payload: true })).toEqual({
            ...initialState,
            registrationRequest: false,
            registrationAnswer: true
        });
    });

    test('should handle REGISTSTRATION_FAILED', () => {
        expect(profileReducer(initialState, { type: REGISTSTRATION_FAILED })).toEqual({
            ...initialState,
            registrationRequest: false,
            registrationFailed: true
        });
    });

    test('should handle AUTHORIZATION_REQUEST', () => {
        expect(profileReducer(initialState, { type: AUTHORIZATION_REQUEST })).toEqual({
            ...initialState,
            authorizationRequest: true,
            authorizationFailed: false
        });
    });

    test('should handle AUTHORIZATION_SUCCESS', () => {
        expect(profileReducer(initialState, { type: AUTHORIZATION_SUCCESS, payload: true })).toEqual({
            ...initialState,
            authorizationRequest: false,
            authorizationAnswer: true
        });
    });

    test('should handle AUTHORIZATION_FAILED', () => {
        expect(profileReducer(initialState, { type: AUTHORIZATION_FAILED })).toEqual({
            ...initialState,
            authorizationRequest: false,
            authorizationFailed: true
        });
    });

    test('should handle LOGOUT_REQUEST', () => {
        expect(profileReducer(initialState, { type: LOGOUT_REQUEST })).toEqual({
            ...initialState,
            logOutRequest: true,
            logOutFailed: false
        });
    });

    test('should handle LOGOUT_SUCCESS', () => {
        expect(profileReducer(initialState, { type: LOGOUT_SUCCESS, payload: true })).toEqual({
            ...initialState,
            profile: null,
            logOutRequest: false,
            logOutAnswer: true
        });
    });

    test('should handle LOGOUT_FAILED', () => {
        expect(profileReducer(initialState, { type: LOGOUT_FAILED })).toEqual({
            ...initialState,
            logOutRequest: false,
            logOutFailed: true
        });
    });

    test('should handle GET_PROFILE_DATA_REQUEST', () => {
        expect(profileReducer(initialState, { type: GET_PROFILE_DATA_REQUEST })).toEqual({
            ...initialState,
            getProfileDataAnswer: true,
            getProfileDataFaild: false
        });
    });

    test('should handle GET_PROFILE_DATA_SUCCESS', () => {
        expect(profileReducer(initialState, { type: GET_PROFILE_DATA_SUCCESS, payload: true })).toEqual({
            ...initialState,
            getProfileDataRequest: false,
            getProfileDataAnswer: true
        });
    });

    test('should handle GET_PROFILE_DATA_FAILED', () => {
        expect(profileReducer(initialState, { type: GET_PROFILE_DATA_FAILED })).toEqual({
            ...initialState,
            getProfileDataAnswer: false,
            getProfileDataFaild: true
        });
    });

    test('should handle SEND_PROFILE_DATA_REQUEST', () => {
        expect(profileReducer(initialState, { type: SEND_PROFILE_DATA_REQUEST })).toEqual({
            ...initialState,
            sendProfileDataRequest: true,
            sendProfileDataFaild: false
        });
    });

    test('should handle SEND_PROFILE_DATA_SUCCESS', () => {
        expect(profileReducer(initialState, { type: SEND_PROFILE_DATA_SUCCESS, payload: true })).toEqual({
            ...initialState,
            sendProfileDataRequest: false,
            sendProfileDataAnswer: true
        });
    });

    test('should handle SEND_PROFILE_DATA_FAILED', () => {
        expect(profileReducer(initialState, { type: SEND_PROFILE_DATA_FAILED })).toEqual({
            ...initialState,
            sendProfileDataRequest: false,
            sendProfileDataFaild: true
        });
    });

    test('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(profileReducer(initialState, { type: REFRESH_TOKEN_REQUEST })).toEqual({
            ...initialState,
            refreshTokenRequest: true,
            refreshTokenFaild: false
        });
    });

    test('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(profileReducer(initialState, { type: REFRESH_TOKEN_SUCCESS, payload: true })).toEqual({
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenAnswer: true
        });
    });

    test('should handle REFRESH_TOKEN_FAILED', () => {
        expect(profileReducer(initialState, { type: REFRESH_TOKEN_FAILED })).toEqual({
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenFaild: true
        });
    });

});