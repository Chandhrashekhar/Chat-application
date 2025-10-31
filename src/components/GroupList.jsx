import { useEffect } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import useChatStore from '../store/chatStore';

export default function GroupList() {
  const { groups, currentGroup, fetchGroups, setCurrentGroup } = useChatStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Groups</h2>
      </div>
      <div className="overflow-y-auto custom-scrollbar h-[calc(100vh-4rem)]">
        {groups.map(group => (
          <button
            key={group.id}
            onClick={() => setCurrentGroup(group.id)}
            className={`w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              currentGroup?.id === group.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{group.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{group.description}</p>
              </div>
              <div className="flex items-center text-gray-400 dark:text-gray-500">
                <UsersIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{group.members.length}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}