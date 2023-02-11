import { useEffect } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import AuthService from "services/auth.service";
import { useLightgallery } from "react-lightgallery";
import PictureService from "services/picture.service";
import { pictureActions } from "redux/slices/picture";
import { Grid, MenuItem, Select } from "@mui/material";
import InputName from "components/templates/InputName";
import { backgroundActions } from "redux/slices/background";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PhotoGallery from "components/templates/PhotoGallery";
import ImageService from "services/image.service";

export default function Pictures() {
  const dispatch = useAppDispatch();
  const { openGallery } = useLightgallery();
  const { user } = useAppSelector((state) => state.auth);
  const { tab } = useAppSelector((state) => state.tab);

  const { background, property } = useAppSelector((state) => state.background);
  const { pictures, type } = useAppSelector((state) => state.picture);

  useEffect(() => {
    PictureService.getPictures(dispatch);
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
      <h2 className="heading">Pictures</h2>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Select
            variant="filled"
            id="selectFormType"
            value={type}
            onChange={(e: any) =>
              dispatch(pictureActions.setType(e.target.value))
            }
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
      <Grid container columnSpacing={3}>
        {pictures.map((picture: any, index: any) =>
          picture.type === type ? (
            type === "private" ? (
              user ? (
                picture?.user_id === user?._id ? (
                  <Grid item md={6} key={picture._id}>
                    <div className="content-item">
                      <InputName
                        id={picture._id}
                        name={picture.name}
                        type={tab}
                      />
                      <div className="items-box">
                        <PhotoGallery
                          group="picture_private"
                          image={`${process.env.REACT_APP_FILE_URL}/${picture.url}`}
                        ></PhotoGallery>
                      </div>
                      <p className="content-icons">
                        <img
                          src={ViewIcon}
                          alt="View"
                          onClick={() => openGallery("picture_private")}
                        />
                        &nbsp;&nbsp;&nbsp;{" "}
                        <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(picture.url, picture._id)}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            PictureService.deletePicture(picture._id, dispatch)
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
              <Grid item md={6} key={picture._id}>
                <div className="content-item">
                  <InputName id={picture._id} name={picture.name} type={tab} />
                  <div className="items-box">
                    <PhotoGallery
                      group="picture_private"
                      image={`${process.env.REACT_APP_FILE_URL}/${picture.url}`}
                    ></PhotoGallery>
                  </div>
                  <p className="content-icons">
                    <img
                      src={ViewIcon}
                      alt="View"
                      onClick={() => openGallery("picture_private")}
                    />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <img
                      src={BgIcon}
                      alt="BG"
                      onClick={() => setBg(picture.url, picture._id)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      onClick={() =>
                        PictureService.deletePicture(picture._id, dispatch)
                      }
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
