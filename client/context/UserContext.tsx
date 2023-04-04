import { useEffect, createContext, useState, ReactNode } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);

        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          setLoading(false);
        });
      } else {
        setUser(userAuth);
        setLoading(false);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const userContext = { user, loading };
  if (loading) return null;

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
