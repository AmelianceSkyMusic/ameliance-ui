import asm from 'asm-ts-scripts';

import s from './MenuItem.module.scss';

interface MenuItem {
	children: React.ReactNode;
	disabled?: boolean;
}

export function MenuItem({ children, disabled }: MenuItem) {
	return (
		<li className={asm.join(s.MenuItem, disabled && s.disabled)}>{children}</li>
	);
}
