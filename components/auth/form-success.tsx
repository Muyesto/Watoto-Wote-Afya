import { FaCircleCheck } from "react-icons/fa6";

const FormSuccess = ({ message }: FormErrorFormSuccessProps) => {
  if (!message) return;
  return (
    <div className="p-3 rounded-lg bg-green-200 w-full flex items-center gap-5">
      <FaCircleCheck color="green" />
      <p className="text-green-500">{message}</p>
    </div>
  );
};

export default FormSuccess;
