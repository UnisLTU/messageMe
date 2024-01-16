interface ErrorModalProps {
  error: string;
}

export const ErrorModal = ({ error }: ErrorModalProps) => {
  return (
    <div className="h-8 w-64  flex justify-center items-center rounded-lg dark:text-white">
      {error + "*"}
    </div>
  );
};
