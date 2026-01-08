import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, isLoading: false, error: null });
            return data;
        } catch (error) {
            const errorMsg = error.message || 'Login failed';
            set({ error: errorMsg, isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
