import { Grid, MenuItem, Select } from "@mui/material";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import { useEffect } from "react";
import MusicService from "services/music.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { backgroundActions } from "redux/slices/background";
import AuthService from "services/auth.service";
import { musicActions } from "redux/slices/music";
import InputName from "components/templates/InputName";

export default function Musics() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { tab } = useAppSelector((state) => state.tab);

  const { property } = useAppSelector((state) => state.background);
  const { musics, type } = useAppSelector((state) => state.music);

  useEffect(() => {
    MusicService.getMusics(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let size = "";

    if (property === "") size = "normal";
    else if (property === "normal") size = "stretched";
    else if (property === "stretched") size = "repeat";
    else if (property === "repeat") size = "";
    else size = "";
    let data = {
      background: size !== "" ? image : "",
      property: size,
      id,
    };
    dispatch(backgroundActions.setBackground(size !== "" ? image : ""));
    dispatch(backgroundActions.setProperty(size));
    if (user) AuthService.background(data, dispatch);
  };

  return (
    <>
      <h2 className="heading">Music</h2>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Select
            variant="filled"
            id="selectFormType"
            value={type}
            onChange={(e: any) =>
              dispatch(musicActions.setType(e.target.value))
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
        {musics.map((music: any) =>
          music.type === type ? (
            type === "private" ? (
              user ? (
                music?.user_id === user?._id ? (
                  <Grid item md={6} key={music._id}>
                    <div className="content-item">
                      <InputName id={music._id} name={music.name} type={tab} />
                      <div className="items-box">
                        <audio
                          controls
                          onPlay={() =>
                            dispatch(backgroundActions.setAnime(true))
                          }
                          onPause={() =>
                            dispatch(backgroundActions.setAnime(false))
                          }
                          style={{ width: "100%" }}
                        >
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${music.url}`}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                      <p className="content-icons">
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            MusicService.deleteMusic(music._id, dispatch)
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
              <Grid item md={6} key={music._id}>
                <div className="content-item">
                  <InputName id={music._id} name={music.name} type={tab} />
                  <div className="items-box">
                    <audio
                      controls
                      onPlay={() => dispatch(backgroundActions.setAnime(true))}
                      onPause={() =>
                        dispatch(backgroundActions.setAnime(false))
                      }
                      style={{ width: "100%" }}
                    >
                      <source
                        src={`${process.env.REACT_APP_FILE_URL}/${music.url}`}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <p className="content-icons">
                    <img src={ViewIcon} alt="View" />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <img
                      src={BgIcon}
                      alt="BG"
                      onClick={() => setBg(music.url, music._id)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      onClick={() =>
                        MusicService.deleteMusic(music._id, dispatch)
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
