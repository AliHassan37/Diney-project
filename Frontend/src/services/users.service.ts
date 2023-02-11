import { getAppDispatch } from "./../utils/dispatch.util";
import http from "./http.service";
import Promisable from "./promisable.service";
import { userActions } from "redux/slices/users";

const UsersService = {
  getUsers: async () => {
    http.setJWT();
    const dispatch = getAppDispatch();

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/users")
    );

    if (success) {
      const { users } = success.data.data;
      dispatch?.(userActions.setUsers(users));
    }

    return [success, error];
  },
};

export default UsersService;
