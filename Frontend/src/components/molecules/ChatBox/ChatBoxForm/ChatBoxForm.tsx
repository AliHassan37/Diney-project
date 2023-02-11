import { Field, reduxForm } from "redux-form";

function ChatBoxForm({ handleSubmit }: any) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <Field
        type="text"
        name="message"
        placeholder="Message"
        component="textarea"
        rows={5}
        style={{ height: "96px", width: "100%", alignSelf: "stretch" }}
        onKeyDown={(e: any) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            handleSubmit();
          }
        }}
      />
      <br />
      <button
        type="submit"
        style={{ padding: "18px 24px", alignSelf: "stretch" }}
      >
        Send
      </button>
    </form>
  );
}

export default reduxForm({ form: "ChatBoxForm" })(ChatBoxForm);
