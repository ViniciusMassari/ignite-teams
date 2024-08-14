import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { getAllPlayersByGroup } from './getAllPlayersByGroup';
import { AppError } from '@utils/AppError';

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const storage = await getAllPlayersByGroup(group);

    const filtered = storage.filter((player) => player.name !== playerName);

    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    return new AppError('Não foi possível remover o jogador, tente novamente');
  }
}
