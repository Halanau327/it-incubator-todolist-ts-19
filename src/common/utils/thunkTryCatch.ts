import { appActions } from "../../app/app.reducer";
import { handleServerNetworkError } from "./handle-server-network-error";

type ThunkAPI = {
  dispatch: any
  rejectWithValue: any
}

export const thunkTryCatch = async (thunkAPI: ThunkAPI, logic: () => Promise<any>) => {
  const { dispatch, rejectWithValue } = thunkAPI;
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