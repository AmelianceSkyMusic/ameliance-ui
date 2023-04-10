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
		current.classList.add(className);
		document.body.appendChild(container.current);
		return () => {
			document.body.removeChild(current);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return ReactDOM.createPortal(children, current);
}
