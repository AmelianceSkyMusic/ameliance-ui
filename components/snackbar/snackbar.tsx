import { createContext, useMemo, useState } from 'react';

import { getRandomNumber } from 'ameliance-scripts';

import type { SnackProps } from './snack';
import { SnacksContainer } from './snacks-container';

type SnackContext = {
	addSnack: (snack: Omit<SnackProps, 'id'>) => void;
	remove: (snackId: string) => void;
	position: SnackProps['position'];
};

export const SnackContext = createContext<SnackContext>({} as SnackContext);

type SnackBarProviderProps = {
	maxSnack?: number;
	children: React.ReactNode;
};

export function SnackBarProvider({ maxSnack = 1, children }: SnackBarProviderProps) {
	const [snacks, setSnacks] = useState<SnackProps[]>([]);
	const [position, setPosition] = useState<SnackProps['position']>('top-right');

	const addSnack = (snack: Omit<SnackProps, 'id'>) => {
		if (snack.position && snack.position !== position) setPosition(snack.position);

		setSnacks((prevSnacks) => {
			const newPrevSnacks = prevSnacks.length < maxSnack ? prevSnacks : prevSnacks.slice(1);
			const newSnack = {
				...snack,
				id: getRandomNumber(100_000_000, 999_999_999).toString(),
			};
			return [...newPrevSnacks, newSnack];
		});
	};

	const remove = (snackId: string) => {
		setSnacks((prevSnacks) => prevSnacks.filter((snack) => snack.id !== snackId));
	};

	const contextValue = useMemo(
		() => ({
			addSnack,
			remove,
			position,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return (
		<SnackContext.Provider value={contextValue}>
			{children}
			<SnacksContainer snacks={snacks} />
		</SnackContext.Provider>
	);
}
