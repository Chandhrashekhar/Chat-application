export const mockUsers = [
  { id: '1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { id: '4', name: 'Sarah Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
];

export const mockGroups = [
  {
    id: '1',
    name: 'General Chat',
    description: 'General discussion for everyone',
    members: ['1', '2', '3', '4'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Tech Talk',
    description: 'Discussion about technology',
    members: ['1', '2', '3'],
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Random',
    description: 'Random conversations',
    members: ['2', '3', '4'],
    createdAt: '2024-01-03T00:00:00Z',
  },
];

export const mockMessages = [
  {
    id: '1',
    groupId: '1',
    userId: '1',
    content: 'Hello everyone! 👋',
    timestamp: '2024-02-10T10:00:00Z',
  },
  {
    id: '2',
    groupId: '1',
    userId: '2',
    content: 'Hi John! How are you?',
    timestamp: '2024-02-10T10:01:00Z',
  },
  {
    id: '3',
    groupId: '1',
    userId: '3',
    content: 'Welcome to the group chat!',
    timestamp: '2024-02-10T10:02:00Z',
  },
];

// Simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getGroups() {
    await delay(500);
    return mockGroups;
  },

  async getGroupMessages(groupId) {
    await delay(500);
    return mockMessages.filter(msg => msg.groupId === groupId);
  },

  async sendMessage(groupId, userId, content) {
    await delay(200);
    const newMessage = {
      id: Date.now().toString(),
      groupId,
      userId,
      content,
      timestamp: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    return newMessage;
  },

  async getUser(userId) {
    await delay(200);
    return mockUsers.find(user => user.id === userId);
  },
};