import { CgDanger } from "react-icons/cg";

const FormError = ({ message }: FormErrorFormSuccessProps) => {
  if (!message) return;
  return (
    <div className="p-3 rounded-lg bg-red-200 w-full flex items-center gap-5">
      <CgDanger color="red" />
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default FormError;
