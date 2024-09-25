import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

/**
 * Обрабатывает ошибки сервера и обновляет состояние приложения.
 *
 * @template D - Тип данных, возвращаемых в ответе сервера.
 * @param {BaseResponse<D>} data - Объект ответа сервера, содержащий сообщения об ошибках.
 * @param {Dispatch} dispatch - Функция диспетчера для отправки действий в Redux.
 * @param {boolean} [isShowGlobal=true] - Флаг, указывающий, нужно ли отображать глобальное сообщение об ошибке.
 * @returns {void} - Функция ничего не возвращает
 */

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, isShowGlobal: boolean = true) => {
  if (isShowGlobal) {
    const error = data.messages.length ? data.messages[0] : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
