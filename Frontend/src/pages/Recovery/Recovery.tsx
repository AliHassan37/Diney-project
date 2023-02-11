import RecoveryForm from "./RecoveryForm";

export default function Recovery() {
  const handleSubmit = async (values: any) => {
  };

  return (
    <div className="form">
      <RecoveryForm onSubmit={handleSubmit} />
    </div>
  );
}
