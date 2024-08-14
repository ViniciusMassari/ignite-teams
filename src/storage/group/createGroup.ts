import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { getAllGroups } from './getAllGroup';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) return new AppError('Grupo já existe');

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, newGroupName])
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
