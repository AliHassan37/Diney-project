import { useEffect } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import { gifActions } from "redux/slices/gif";
import GifService from "services/gif.service";
import AuthService from "services/auth.service";
import { useLightgallery } from "react-lightgallery";
import InputName from "components/templates/InputName";
import { Grid, MenuItem, Select } from "@mui/material";
import { backgroundActions } from "redux/slices/background";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PhotoGallery from "components/templates/PhotoGallery";
import ImageService from "services/image.service";

export default function Gifs() {
  const dispatch = useAppDispatch();

  const { openGallery } = useLightgallery();

  const { tab } = useAppSelector((state) => state.tab);
  const { user } = useAppSelector((state) => state.auth);
  const { gifs, type } = useAppSelector((state) => state.gif);
  const { background, property } = useAppSelector((state) => state.background);

  useEffect(() => {
    GifService.getGifs(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let size = "";
    if (property === "") size = "normal";
    else if (property === "normal") size = "stretched";
    else if (property === "stretched") size = "repeat";
    else if (property === "repeat") size = "";
    else size = "";

    if (background !== "" && background !== image) size = "normal";

    let data = {
      background: size !== "" ? image : "",
      property: size,
      video: "",
      id,
    };
    dispatch(backgroundActions.setBackground(size !== "" ? image : ""));
    dispatch(backgroundActions.setProperty(size));
    dispatch?.(backgroundActions.setVideo(""));
    if (user) AuthService.background(data, dispatch);
    else ImageService.background(data, dispatch);
  };

  return (
    <>
      <h2 className="heading">Gifs</h2>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Select
            variant="filled"
            id="selectFormType"
            value={type}
            onChange={(e: any) => dispatch(gifActions.setType(e.target.value))}
            sx={{
              "& :after, :before": {
                display: "none",
              },
              color: "#ffffff",
              border: "1px solid #ffffff",
              background: "transparent !important",
              lineHeight: "0.5em",
              borderRadius: 0,
              width: "100%",
              marginBottom: "16px",
              "& .MuiSelect-select": {
                height: "1em !important",
                minHeight: "1em !important",
                paddingTop: "20px",
              },
              "& :hover, .Mui-focused": {
                background: "transparent",
              },
              "& svg": {
                fill: "#ffffff",
              },
            }}
          >
            <MenuItem selected disableRipple value={"public"}>
              Public
            </MenuItem>
            <MenuItem
              disableRipple
              value={"private"}
              disabled={user ? false : true}
            >
              Private
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      {/* {loading ? (
        <SkeletonLoader />
      ) : ( */}
      <Grid container columnSpacing={3} gridAutoFlow="dense">
        {gifs.map((gif: any, index: any) =>
          gif.type === type ? (
            type === "private" ? (
              user ? (
                gif?.user_id === user?._id ? (
                  <Grid item md={6} key={gif._id}>
                    <div className="content-item">
                      <InputName id={gif._id} name={gif.name} type={tab} />
                      <div className="items-box">
                        <PhotoGallery
                          group="gif_private"
                          src={`${process.env.REACT_APP_FILE_URL}/${gif.url}`}
                        ></PhotoGallery>
                      </div>
                      <p className="content-icons">
                        <img
                          src={ViewIcon}
                          alt="View"
                          onClick={() => openGallery("gif_private")}
                        />
                        &nbsp;&nbsp;&nbsp;{" "}
                        <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(gif.url, gif._id)}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            GifService.deleteGif(gif._id, dispatch)
                          }
                        />
                      </p>
                    </div>
                  </Grid>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            ) : (
              <Grid item md={6} key={gif._id}>
                <div className="content-item">
                  <InputName id={gif._id} name={gif.name} type={tab} />
                  <div className="items-box">
                    <PhotoGallery
                      group="gif_public"
                      image={`${process.env.REACT_APP_FILE_URL}/${gif.url}`}
                    ></PhotoGallery>
                  </div>
                  <p className="content-icons">
                    <img
                      src={ViewIcon}
                      alt="View"
                      onClick={() => openGallery("gif_public")}
                    />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <img
                      src={BgIcon}
                      alt="BG"
                      onClick={() => setBg(gif.url, gif._id)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      onClick={() => GifService.deleteGif(gif._id, dispatch)}
                    />
                  </p>
                </div>
              </Grid>
            )
          ) : (
            ""
          )
        )}
      </Grid>
      {/* )} */}
    </>
  );
}
