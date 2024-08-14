import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

import { Alert, FlatList } from 'react-native';
import { Button } from '@components/Button';

import { Routes } from '@routes/app.routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAllGroups } from '@storage/group/getAllGroup';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '@components/Loading';

type GroupsRoute = NativeStackScreenProps<Routes, 'Groups'>;

export const Groups = ({ navigation: { navigate } }: GroupsRoute) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => navigate('Players', { group: item })}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message='Que tal cadastrar a primeira turma?' />
          )}
        />
      )}
      <Button title='Criar nova turma' onPress={() => navigate('NewGroup')} />
    </Container>
  );
};
