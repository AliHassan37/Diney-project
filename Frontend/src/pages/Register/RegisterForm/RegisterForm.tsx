import { fields, updateFields } from ".";
import { change, reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect } from "react";
import dobCalc from "utils/calculator.util";
function RegisterForm({ handleSubmit }: any) {
  const form = "RegisterForm";
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const dob = useAppSelector((state) => state.form?.[form]?.values?.dob);

  useEffect(() => {
    if (!dob?.date) return;
    let response = dobCalc(dob?.date);

    dispatch(change(form, "age", response?.age));
    dispatch(change(form, "zodiac", response?.zodiac));
    dispatch(change(form, "star", response?.star));
    dispatch(change(form, "planet", response?.planet));
  }, [dispatch, dob?.date]);

  useEffect(() => {
    if (user) {
      dispatch(change(form, "name", user?.name));
      dispatch(change(form, "race", user?.race));
      dispatch(change(form, "gender", user?.gender));
      dispatch(change(form, "email", user?.email));
      dispatch(change(form, "dob", { date: user?.dob }));
      dispatch(change(form, "age", user?.age));
      dispatch(change(form, "star", user?.star));
      dispatch(change(form, "zodiac", user?.zodiac));
      dispatch(change(form, "planet", user?.planet));
      dispatch(change(form, "hair", user?.hair));
      dispatch(change(form, "eyes", user?.eyes));
      dispatch(change(form, "height", user?.height));
      dispatch(change(form, "weight", user?.weight));
      dispatch(change(form, "blood", user?.blood));
      dispatch(change(form, "status", user?.status));
      dispatch(change(form, "country", user?.country));
      dispatch(change(form, "phone", user?.phone));
      dispatch(change(form, "facebook", user?.facebook));
      dispatch(change(form, "instagram", user?.instagram));
      dispatch(change(form, "twitter", user?.twitter));
      dispatch(change(form, "youtube", user?.youtube));
      dispatch(change(form, "snapchat", user?.snapchat));
      dispatch(change(form, "tiktok", user?.tiktok));
      dispatch(change(form, "discord", user?.discord));
      dispatch(change(form, "paypal", user?.paypal));
    }
  }, [dispatch, user]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReduxFormFields fields={fields} />
        <br />
        {user ? (
          <>
            <ReduxFormFields fields={updateFields} />
            <br />
          </>
        ) : (
          ""
        )}
        <Button variant="outlined" type="submit" disableElevation>
          {user ? "Save" : "Register"}
        </Button>
        <br />
        <br />
        {user && (
          <Button variant="outlined" type="button" disableElevation>
            Delete Account
          </Button>
        )}
      </form>
    </div>
  );
}
export default reduxForm({ form: "RegisterForm" })(RegisterForm);
