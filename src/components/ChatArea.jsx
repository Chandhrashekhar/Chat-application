import { useEffect, useRef } from 'react';
import useChatStore from '../store/chatStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatArea() {
  const { currentGroup, messages, typingUsers } = useChatStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentGroup) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Select a group to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {currentGroup.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentGroup.members.length} members
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {typingUsers.size > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            Someone is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}