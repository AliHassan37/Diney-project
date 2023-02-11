import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IDropzoneProps,
  IFileWithMeta,
  ILayoutProps,
} from "react-dropzone-uploader";
import UploadIcon from "assets/Upload.png";
import { config } from "config";
import ToasterService from "utils/toaster.util";
import GifService from "services/gif.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PictureService from "services/picture.service";
import VideoService from "services/video.service";
import MusicService from "services/music.service";

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div className="dropzone-flex">
      <div {...dropzoneProps}>
        {previews}
        {files.length < maxFiles && input}
      </div>
      <div>{files.length > 0 && submitButton}</div>
    </div>
  );
};

export default function FileDropZone({ type, uploadType }: any) {
  const dispatch = useAppDispatch();
  const { type: gifType } = useAppSelector((state) => state.gif);
  const { type: videoType } = useAppSelector((state) => state.video);
  const { type: musicType } = useAppSelector((state) => state.music);
  const { type: pictureType } = useAppSelector((state) => state.picture);

  const getUploadParams = async ({ file }: IFileWithMeta) => {
    const body = new FormData();
    body.append("image", file);
    return { url: `${config.API_URL}/guest/upload`, body };
  };

  const handleChangeStatus = ({ meta }: any, status: any) => {
    if (status === "headers_received") {
      ToasterService.showSuccess(`${meta.name} uploaded!`);
    } else if (status === "aborted") {
      ToasterService.showError(`${meta.name} upload failed!`);
    }
  };

  const handleSubmit: IDropzoneProps["onSubmit"] = (allFiles) => {
    let arr: any[] = [];
    allFiles.forEach((f) => {
      let payload = {} as any;
      const filename = f.meta.name.split(".").slice(0, -1).join(".");
      payload.name = filename;
      if (uploadType === "gifs") payload.type = gifType;
      if (uploadType === "music") payload.type = musicType;
      if (uploadType === "videos") payload.type = videoType;
      if (uploadType === "pictures") payload.type = pictureType;
      payload.file_type = f.meta.type;
      let xhr = JSON.parse(f?.xhr?.response);
      payload.url = xhr.data.url;
      arr.push({ ...payload });
    });

    if (uploadType === "gifs") GifService.addGif(arr, dispatch);
    if (uploadType === "music") MusicService.addMusic(arr, dispatch);
    if (uploadType === "videos") VideoService.addVideo(arr, dispatch);
    if (uploadType === "pictures") PictureService.addPicture(arr, dispatch);

    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      LayoutComponent={Layout}
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      submitButtonContent={`Submit ${uploadType}`}
      accept={
        uploadType === "videos"
          ? "video/*"
          : uploadType === "music"
          ? "audio/*"
          : uploadType === "gifs"
          ? ".gif"
          : uploadType === "pictures"
          ? ".png, .jpeg, .jpg, .webp, .png, .svg"
          : ""
      }
      maxFiles={5}
      inputContent={
        <div style={{ textAlign: "center" }}>
          <img
            src={UploadIcon}
            alt="Upload"
            style={{
              width: "48px",
              margin: "0",
            }}
          />
          <p
            style={{
              margin: 0,
              color: "#000000",
              fontSize: "16px",
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            Drag and Drop or Browse to Upload {uploadType}
          </p>
        </div>
      }
      styles={{
        dropzone: {
          minHeight: 125,
          maxHeight: 125,
          border: "none",
          borderRadius: 0,
          background: "#ffffff",
        },
      }}
    />
  );
}
