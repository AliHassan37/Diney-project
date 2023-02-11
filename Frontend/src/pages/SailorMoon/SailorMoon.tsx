import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import SailorA from "assets/Sailor Moon 1.png";
import SailorB from "assets/Sailor Moon 2.png";
import SailorC from "assets/Sailor Moon 3.png";
import SailorD from "assets/Sailor Moon 4.png";
import MusicDropZone from "components/atoms/MusicDropZone";
import ImageService from "services/image.service";
import AuthService from "services/auth.service";

export default function SailorMoon() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { music, outfit, anime } = useAppSelector((state) => state.background);
  const [anim, setAnim] = useState(anime);
  const [image, setImage] = useState(true);

  const audioRef = useRef<any>();
  let sailorPlay = useRef<any>(null);

  useEffect(() => {
    setAnim(anime);
  }, [anime]);

  useEffect(() => {
    setImage(outfit);
  }, [outfit]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [user, music]);

  useEffect(() => {
    ImageService.getBgMusic(dispatch);
  }, [dispatch]);

  const outfitChange = () => {
    setImage(!image);

    if (user) AuthService.outfit(image, dispatch);
    else ImageService.outfit(image, dispatch);
  };

  return (
    <div className="sailor-img">
      <h3>Sailor Moon</h3>
      {music || user?.music ? (
        anim ? (
          <img
            alt="Sailor Music B"
            src={image ? SailorB : SailorD}
            onClick={() => outfitChange()}
          />
        ) : (
          <img
            alt="Sailor Music A"
            src={image ? SailorA : SailorC}
            onClick={() => outfitChange()}
          />
        )
      ) : (
        <img
          alt="Sailor A"
          src={image ? SailorA : SailorC}
          onClick={() => outfitChange()}
        />
      )}
      <audio
        controls
        autoPlay
        loop
        ref={audioRef}
        onPlay={() => {
          sailorPlay.current = setInterval(function () {
            setAnim((prev) => !prev);
          }, 300);
        }}
        onPause={() => {
          if (sailorPlay.current) clearInterval(sailorPlay.current);
        }}
      >
        <source
          src={
            user
              ? `${process.env.REACT_APP_FILE_URL}/${user?.music}`
              : `${process.env.REACT_APP_FILE_URL}/${music}`
          }
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "0",
          left: "0",
          borderRadius: 0,
        }}
      >
        <MusicDropZone />
      </div>
    </div>
  );
}
