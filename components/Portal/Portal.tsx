import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
	children: React.ReactElement;
	className?: string;
	elementType?: string;
}

export function Portal({ children, className = 'root-portal', elementType = 'div' }: PortalProps) {
	const container = useRef(document.createElement(elementType));
	const { current } = container;

	useEffect(() => {
		const classNameArray = className.split(' ');
		if (classNameArray.length > 1) {
			classNameArray.forEach((classItem) => current.classList.add(classItem));
		} else {
			current.classList.add(classNameArray.join(''));
		}
		document.body.appendChild(container.current);
		return () => {
			document.body.removeChild(current);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return ReactDOM.createPortal(children, current);
}
