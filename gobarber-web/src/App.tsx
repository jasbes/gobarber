import React from 'react';

import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';
import GlogalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlogalStyle />
  </>
);

export default App;
