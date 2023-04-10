import asm from 'asm-ts-scripts';

import { Backdrop } from '../Backdrop/Backdrop';
import { Block } from '../blocks/Block';
import { LoaderLine } from '../Loader/LoaderLine';
import { Portal } from '../Portal';

import s from './LoaderOverlay.module.scss';

export function LoaderOverlay() {
	return (
		<Portal>
			<Block className={asm.join(s.LoaderOverlay)}>
				<Backdrop show />
				<LoaderLine />
			</Block>
		</Portal>
	);
}
