import { create } from "zustand";
import { signInAction, signUpAction, signOutAction, getSession } from "@/action/auth";

const useAuthStore = create((set) => ({
  user: null,
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
  login: async (language,credentials) => {
    set({ isLoading: true, error: null });
    const result = await signInAction(language,credentials);
    
    if (result.success) {
      set({ 
        user: result.data, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return { success: true };
    } else {
      set({ error: result.error, isLoading: false });
      return { success: false, error: result.error };
    }
  },

  /**
   * Handle Sign Up
   */
//  signup: async (formData, locale) => {
//   set({ isLoading: true, error: null });
  
//   // Call the server action from the store
//   const result = await signUpAction(formData, locale);
  
//   if (result.success) {
//     set({ 
//       user: result.data, 
//       isAuthenticated: true, 
//       isLoading: false 
//     });
//     return { success: true };
//   } else {
//     set({ error: result.error, isLoading: false });
//     return { success: false, error: result.error };
//   }
// },



signup: async (formData, locale) => {
    set({ isLoading: true, error: null });
    
    // Pass both arguments clearly
    const result = await signUpAction(formData, locale);
    
    if (result.success) {
      set({ user: result.data, isAuthenticated: true, isLoading: false });
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
