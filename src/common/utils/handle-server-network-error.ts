import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { appActions } from "app/app.reducer";

/**
 * Обрабатывает сетевые ошибки и обновляет состояние приложения.
 *
 * @param {unknown} e - Ошибка, которая может быть экземпляром Error или AxiosError.
 * @param {Dispatch} dispatch - Функция диспетчера для отправки действий в Redux.
 * @returns {void} - Функция ничего не возвращает
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
