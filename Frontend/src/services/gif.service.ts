import http from "./http.service";
import Promisable from "./promisable.service";
import { AppDispatch } from "redux/store";
import { reset } from "redux-form";
import { gifActions } from "redux/slices/gif";

const GifService = {
  addGif: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.post("guest/gif", data)
    );

    if (success) {
      const { gif } = success.data.data;
      dispatch?.(gifActions.addGif(gif));
      dispatch?.(reset("FooterForm"));
    }

    return [success, error];
  },

  deleteGif: async (id: string, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.delete(`guest/gif/${id}`)
    );

    if (success) {
      dispatch?.(gifActions.deleteGif(id));
    }

    return [success, error];
  },

  getGifs: async (dispatch?: AppDispatch) => {
    http.setJWT();
		dispatch?.(gifActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/gifs")
    );

    if (success) {
      const { gifs } = success.data.data;
      dispatch?.(gifActions.setGifs(gifs));
    }
		dispatch?.(gifActions.setLoading(false));

    return [success, error];
  },

  updateGif: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/gif", data)
    );

    if (success) {
      const { gif } = success.data.data;

      dispatch?.(gifActions.updateGif(gif));
    }

    return [success, error];
  },
};

export default GifService;
