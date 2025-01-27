import GroupList from './components/GroupList';
import ChatArea from './components/ChatArea';

function App() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <GroupList />
      <ChatArea />
    </div>
  );
}

export default App;