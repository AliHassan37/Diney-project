import { useEffect, useState } from "react";
import ViewIcon from "assets/View.png";
import DeleteIcon from "assets/Delete.png";
import BgIcon from "assets/Background.png";
import VideoService from "services/video.service";
import { Grid, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { backgroundActions } from "redux/slices/background";
import AuthService from "services/auth.service";
import { videoActions } from "redux/slices/video";
import InputName from "components/templates/InputName";
import ReactImageVideoLightbox from "react-image-video-lightbox";
import ImageService from "services/image.service";

export default function Videos() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { tab } = useAppSelector((state) => state.tab);
  const { video } = useAppSelector((state) => state.background);
  const [lightbox, setLightbox] = useState(false);
  const [index, setIndex] = useState(0);
  const { videos, publics, privates, type } = useAppSelector(
    (state) => state.video
  );

  useEffect(() => {
    VideoService.getVideos(dispatch);
  }, [dispatch]);

  const setBg = (image: any, id: any) => {
    let data = {
      video: video === image ? "" : image,
      id,
    };
    dispatch(backgroundActions.setVideo(video === image ? "" : image));
    if (user) AuthService.video(data, dispatch);
    else ImageService.background(data, dispatch);
  };

  return (
    <>
      <h2 className="heading">Videos</h2>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Select
            variant="filled"
            id="selectFormType"
            value={type}
            onChange={(e: any) =>
              dispatch(videoActions.setType(e.target.value))
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
      {lightbox && (
        <div style={{ position: "relative", zIndex: 99999 }}>
          <ReactImageVideoLightbox
            data={show ? privates : publics}
            startIndex={index}
            showResourceCount={true}
            onCloseCallback={() => setLightbox(false)}
            onNavigationCallback={() => console.log(`Current index: ${index}`)}
            style={{ zIndex: 9999 }}
          />
        </div>
      )}
      {/* {loading ? (
        <SkeletonLoader />
      ) : ( */}
      <Grid container columnSpacing={3}>
        {videos.map((video: any, index: any) =>
          video.type === type ? (
            type === "private" ? (
              user ? (
                video?.user_id === user?._id ? (
                  <Grid item md={6} key={video._id}>
                    <div className="content-item">
                      <InputName id={video._id} name={video.name} type={tab} />
                      <div className="items-box">
                        <video
                          controls
                          onPlay={() =>
                            dispatch(backgroundActions.setAnime(true))
                          }
                          onPause={() =>
                            dispatch(backgroundActions.setAnime(false))
                          }
                        >
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                            type="video/mp4"
                          />
                          <source
                            src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                            type="video/ogg"
                          />
                        </video>
                      </div>
                      <p className="content-icons">
                        <img
                          src={ViewIcon}
                          alt="View"
                          onClick={() => {
                            setLightbox(true);
                            setIndex(index);
                            setShow(true);
                          }}
                        />
                        &nbsp;&nbsp;&nbsp;{" "}
                        <img
                          src={BgIcon}
                          alt="BG"
                          onClick={() => setBg(video.url, video._id)}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          onClick={() =>
                            VideoService.deleteVideo(video._id, dispatch)
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
              <Grid item md={6} key={video._id}>
                <div className="content-item">
                  <InputName id={video._id} name={video.name} type={tab} />
                  <div className="items-box">
                    <video
                      controls
                      onPlay={() => dispatch(backgroundActions.setAnime(true))}
                      onPause={() =>
                        dispatch(backgroundActions.setAnime(false))
                      }
                    >
                      <source
                        src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                        type="video/mp4"
                      />
                      <source
                        src={`${process.env.REACT_APP_FILE_URL}/${video.url}`}
                        type="video/ogg"
                      />
                    </video>
                  </div>
                  <p className="content-icons">
                    <img
                      src={ViewIcon}
                      onClick={() => {
                        setLightbox(true);
                        setIndex(index);
                        setShow(false);
                      }}
                      alt="View"
                    />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <img
                      src={BgIcon}
                      alt="BG"
                      onClick={() => setBg(video.url, video._id)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      onClick={() =>
                        VideoService.deleteVideo(video._id, dispatch)
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
