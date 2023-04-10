import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './AudioPlayer.module.scss';

type AudioPlayerElement = HTMLAudioElement;

export type AudioPlayerProps
= React.DetailedHTMLProps<React.AudioHTMLAttributes<AudioPlayerElement>, AudioPlayerElement>;

export const AudioPlayer = forwardRef<AudioPlayerElement, AudioPlayerProps>(({
	className,
	...rest
}, ref) => (

	<audio
		className={asm.join(s.AudioPlayer, className)}
		ref={ref}
		{...rest}
	>
		<track
			kind="captions"
		/>
	</audio>

));

AudioPlayer.displayName = 'AudioPlayer';
