import { join } from 'ameliance-scripts/scripts/join';
import c from './menu-item.module.scss';

interface MenuItem {
   children: React.ReactNode;
   disabled?: boolean;
}

export function MenuItem({ children, disabled }: MenuItem) {
   return <li className={join(c.MenuItem, disabled && c.disabled)}>{children}</li>;
}
