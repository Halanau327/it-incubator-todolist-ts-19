import { appActions } from "../../app/app.reducer";
import { handleServerNetworkError } from "./handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, AppRootStateType } from "../../app/store";
import { BaseResponse } from "../types";

type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>

/**
 * Функция thunkTryCatch оборачивает асинхронную логику в блок try-catch.
 * Она устанавливает статус приложения в "loading" перед выполнением логики
 * и возвращает результат логики или ошибку. В случае ошибки она обрабатывает
 * её с помощью handleServerNetworkError и возвращает rejectWithValue.
 * В конце статус приложения устанавливается в "idle".
 *
 * @template T - Тип возвращаемого значения асинхронной логики.
 * @param {ThunkAPI} thunkAPI - Объект ThunkAPI, содержащий dispatch и rejectWithValue.
 * @param {() => Promise<T>} logic - Асинхронная функция, которая содержит основную логику.
 * @returns {Promise<T | ReturnType<typeof rejectWithValue>>} - Возвращает результат выполнения логики или rejectWithValue.
 */


// Promise<{task: TaskType} | RejectWithValue<BaseResponse<{}> | null, unknown>>
// Promise<{todolist: TodolistType} | RejectWithValue<BaseResponse<{}> | null, unknown>>
export const thunkTryCatch = async <T>({ dispatch, rejectWithValue
}: ThunkAPI, logic: () => Promise<T>): Promise<T | ReturnType<typeof rejectWithValue>> => {
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};