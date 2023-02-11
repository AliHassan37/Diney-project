import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
function LoginForm({ handleSubmit }: any) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReduxFormFields fields={fields} />
        <br />
        <Button variant="outlined" type="submit" disableElevation>
          Login
        </Button>
      </form>
    </div>
  );
}
export default reduxForm({ form: "LoginForm" })(LoginForm);
