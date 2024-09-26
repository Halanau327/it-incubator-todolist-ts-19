import { appActions } from "../../app/app.reducer";
import { handleServerNetworkError } from "./handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, AppRootStateType } from "../../app/store";
import { BaseResponse } from "../types";

type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>

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