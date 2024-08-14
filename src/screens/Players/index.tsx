import { useRef, useEffect, useState } from 'react';
import { FlatList, TextInput } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '@routes/app.routes';
import { Alert } from 'react-native';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup';
import { AppError } from '@utils/AppError';
import { getPlayersByGroupAndTeam } from '@storage/player/getPlayersByGroupAndTeam';
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup';
import { removeGroupByName } from '@storage/group/removeGroupByName';

type PlayersProps = NativeStackScreenProps<Routes, 'Players'>;

export function Players({ route, navigation: { navigate } }: PlayersProps) {
  const newPlayerNameInputRef = useRef<TextInput>(null);

  const [selectedTeam, setSelectedTeam] = useState('Time A');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  async function handleAddPlayer() {
    if (playerName.trim().length === 0) {
      Alert.alert('Nova pessoa', 'Informe o nome do jogador para adicionar');
      return;
    }
    const newPlayer: PlayerStorageDTO = {
      name: playerName,
      team: selectedTeam,
    };
    setPlayerName('');
    newPlayerNameInputRef.current?.blur();

    const result = await addPlayerByGroup(newPlayer, route.params.group);
    await fetchPlayersByTeam();
    if (result instanceof AppError) {
      Alert.alert('Nova pessoa', result.message);
      return;
    }
  }
  async function handlePlayerRemove(playerName: string) {
    const result = await removePlayerByGroup(playerName, route.params.group);

    if (result instanceof AppError) {
      Alert.alert('Remover pessoa', result.message);
      return;
    }
    fetchPlayersByTeam();
    return;
  }

  async function fetchPlayersByTeam() {
    const playersByTeam = await getPlayersByGroupAndTeam(
      route.params.group,
      selectedTeam
    );
    if (playersByTeam instanceof AppError) {
      Alert.alert('Buscar jogadores', playersByTeam.message);
      return;
    }
    setPlayers(playersByTeam);
  }

  async function groupRemove() {
    try {
      await removeGroupByName(route.params.group);
      navigate('Groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [selectedTeam]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={route.params.group}
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input
          onChangeText={(e) => setPlayerName(e)}
          placeholder='Nome da pessoa'
          value={playerName}
          autoCorrect={false}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button
        title='Remover Turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
