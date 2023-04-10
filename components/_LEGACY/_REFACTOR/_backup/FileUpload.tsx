// import { Icon } from '~components/Icon';

import s from './FileUpload.module.scss';

interface Props {
	icon: string;
}

export function FileUpload({
	icon,
}: Props) {
	return (
		<div>
			<label htmlFor="file">
				{/* <Icon icon={icon} /> */}
				<input
					type="file"
					className={s.input}
					id="file"
				/>
			</label>
		</div>
	);
}
