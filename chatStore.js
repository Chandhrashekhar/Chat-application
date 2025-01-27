import { create } from 'zustand';
import { api } from '../lib/mockData';

const useChatStore = create((set, get) => ({
  currentUser: { id: '1', name: 'John Doe' },
  groups: [],
  currentGroup: null,
  messages: [],
  typingUsers: new Set(),
  isLoading: false,
  error: null,

  fetchGroups: async () => {
    set({ isLoading: true });
    try {
      const groups = await api.getGroups();
      set({ groups, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  setCurrentGroup: async (groupId) => {
    set({ isLoading: true });
    try {
      const messages = await api.getGroupMessages(groupId);
      const group = get().groups.find(g => g.id === groupId);
      set({ currentGroup: group, messages, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  sendMessage: async (content) => {
    const { currentUser, currentGroup } = get();
    if (!currentGroup) return;

    try {
      const newMessage = await api.sendMessage(currentGroup.id, currentUser.id, content);
      set(state => ({
        messages: [...state.messages, newMessage],
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  setTyping: (userId, isTyping) => {
    set(state => {
      const newTypingUsers = new Set(state.typingUsers);
      if (isTyping) {
        newTypingUsers.add(userId);
      } else {
        newTypingUsers.delete(userId);
      }
      return { typingUsers: newTypingUsers };
    });
  },
}));

export default useChatStore;