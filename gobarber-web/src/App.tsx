import React from 'react';

import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';
import GlogalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlogalStyle />
  </>
);

export default App;
