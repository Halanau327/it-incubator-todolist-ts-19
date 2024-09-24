import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, isShowGlobal: boolean = true) => {
  if (isShowGlobal) {
    const error = data.messages.length ? data.messages[0] : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
