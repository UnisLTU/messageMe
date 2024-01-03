interface MessageContentProps {
  isDeleted: boolean;
  content: string;
}

const MessageContent = ({ isDeleted, content }: MessageContentProps) => {
  return (
    <>
      {!isDeleted ? (
        <p className="pl-4">{content}</p>
      ) : (
        <p className="pl-4 text-xs">"Message has been removed by user"</p>
      )}
    </>
  );
};

export default MessageContent;
