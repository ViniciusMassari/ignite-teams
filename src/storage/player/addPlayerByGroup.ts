import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import type { PlayerStorageDTO } from './PlayerStorageDTO';
import { getAllPlayersByGroup } from './getAllPlayersByGroup';

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const players = await getAllPlayersByGroup(group);

    const doesPlayerAlreadyExists = players.find(
      (storedPlayer) => storedPlayer.name === newPlayer.name
    );
    if (doesPlayerAlreadyExists)
      return new AppError('Jogador já cadastrado em um time deste grupo');

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...players, newPlayer])
    );
  } catch (error) {
    return new AppError('Houve um erro ao salvar o jogador, tente novamente');
  }
}
