import {
	createContext, useContext, useMemo, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import type { SnackProps } from './Snack';
import { SnacksContainer } from './SnacksContainer';

interface SnackContext {
	add: (snack: Omit<SnackProps, 'id'>) => void;
	remove: (snackId: string) => void;
	position: SnackProps['position'];
}

const SnackContext = createContext<SnackContext>({} as SnackContext);

// *----- export contextual  hook -----
export const useSnack = () => useContext(SnackContext);

interface SnackBarProviderProps {
	maxSnack?: number;
	children: React.ReactElement;
}

export function SnackBarProvider({
	maxSnack = 1,
	children,
}: SnackBarProviderProps) {
	const [snacks, setSnacks] = useState<SnackProps[]>([]);
	const [position, setPosition] = useState<SnackProps['position']>('top-right');

	const add = (snack: Omit<SnackProps, 'id'>) => {
		if (snack.position && snack.position !== position) setPosition(snack.position);

		setSnacks((prevSnacks) => {
			const newPrevSnacks = prevSnacks.length < maxSnack ? prevSnacks : prevSnacks.slice(1);
			const newSnack = {
				...snack,
				id: asm.getRandomNumber(100_000_000, 999_999_999).toString(),
			};
			return [
				...newPrevSnacks,
				newSnack,
			];
		});
	};

	const remove = (snackId: string) => {
		setSnacks((prevSnacks) => prevSnacks.filter((snack) => snack.id !== snackId));
	};

	const contextValue = useMemo(() => ({
		add, remove, position,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), []);

	return (
		<SnackContext.Provider value={contextValue}>
			{children}
			<SnacksContainer snacks={snacks} />
		</SnackContext.Provider>
	);
}
