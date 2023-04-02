import React from 'react';
import { PlayersListGate } from 'entities/player/model';
import { PlayerList } from 'entities/player/ui';

const PlayersPage = () => {
	return (
		<div className="container mx-auto px-4 pt-16">
			<PlayersListGate />
			<PlayerList />
		</div>
	);
};

export default PlayersPage;