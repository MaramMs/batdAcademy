import { create } from "zustand";
import { signInAction, signUpAction, signOutAction, getSession, forgetPasswordAction, resetPasswordAction } from "@/action/auth";

const useAuthStore = create((set) => ({
  member: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Initialize auth state from server session
   */
  initAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await getSession();
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  /**
   * Handle Sign In
   */
  login: async (formData, language) => {
    set({ isLoading: true, error: null });
    const result = await signInAction(formData, language);
    
    if (result.success) {
      set({ 
        member: result?.data?.member, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return result;
    } else {
      set({ error: result.error, isLoading: false });
      return { success: false, error: result.error };
    }
  },

  /**
   * Handle Sign Up
   */
signup: async (formData, locale) => {
    set({ isLoading: true, error: null });
    
    const result = await signUpAction(formData, locale);
    console.log(result , 'result');
    
    
    if (result.success) {
      set({ member: result.member, isAuthenticated: true, isLoading: false });
      return result;
    } else {
      set({ error: result.error, isLoading: false });
      return result;
    }
},

forgetPassword: async (formData, locale) => {
    set({ isLoading: true, error: null });
    
    const result = await forgetPasswordAction(formData, locale);
    console.log(result , 'result');
    
    
    if (result.success) {
      set({ isLoading: false });
      return result;
    } else {
      set({ error: result.error, isLoading: false });
      return result;
    }
},


resetPassword: async (formData, locale) => {
    set({ isLoading: true, error: null });
    
    const result = await resetPasswordAction(formData, locale);
    console.log(result , 'result');
    
    
    if (result.success) {
      set({ isLoading: false });
      return result;
    } else {
      set({ error: result.error, isLoading: false });
      return result;
    }
},
  /**
   * Handle Logout
   */
  logout: async () => {
    await signOutAction();
    set({ user: null, isAuthenticated: false });
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
