import { format } from 'date-fns';
import { useMemo } from 'react';
import useChatStore from '../store/chatStore';

export default function ChatMessage({ message }) {
  const { currentUser } = useChatStore();
  const isOwnMessage = message.userId === currentUser.id;

  const formattedTime = useMemo(() => {
    return format(new Date(message.timestamp), 'HH:mm');
  }, [message.timestamp]);

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        {!isOwnMessage && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {message.userName}
          </div>
        )}
        <p className="break-words">{message.content}</p>
        <div
          className={`text-xs mt-1 ${
            isOwnMessage ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}