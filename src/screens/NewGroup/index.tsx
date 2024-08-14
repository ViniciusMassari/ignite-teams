import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '@routes/app.routes';
import { useState } from 'react';
import { groupCreate } from '@storage/group/createGroup';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

type NewGroupProps = {} & NativeStackScreenProps<Routes, 'NewGroup'>;

export function NewGroup({ navigation: { navigate } }: NewGroupProps) {
  const [groupName, setGroupName] = useState('');

  const handleCreateNewGroup = async () => {
    if (groupName.trim().length === 0) {
      Alert.alert('Erro ao criar', 'Informe um nome para o grupo');
      return;
    }

    const result = await groupCreate(groupName);
    if (result instanceof AppError) {
      Alert.alert('Erro ao criar', 'Grupo já existe');
      setGroupName('');
      return;
    }
    navigate('Players', { group: groupName });
  };

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar os participantes !'
        />
        <Input
          value={groupName}
          placeholder='Nome da turma'
          onChangeText={(newText) => setGroupName(newText)}
        />
        <Button title='Criar' onPress={handleCreateNewGroup} />
      </Content>
    </Container>
  );
}
