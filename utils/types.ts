export interface context {
    isLoading: boolean,
    setIsLoading: any,
    user: any,
    updateUser: (updatedUser: any) => void,
    // logout: () => void,
    isAuthenticated: () => boolean,
    // removeUser: () => void,
}