import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button onPress={signOut} title="Sair" />
    </View>
  );
};

export default Dashboard;
