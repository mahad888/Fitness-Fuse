import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // User is logged in
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        // User is not logged in
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoggedIn };
};
