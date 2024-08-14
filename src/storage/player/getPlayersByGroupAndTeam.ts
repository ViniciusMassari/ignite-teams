import { AppError } from '@utils/AppError';
import { getAllPlayersByGroup } from './getAllPlayersByGroup';

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const players = await getAllPlayersByGroup(group);
    return players.filter((player) => player.team === team);
  } catch (error) {
    return new AppError(
      'Não foi possível buscar os jogadores, tente novamente'
    );
  }
}
