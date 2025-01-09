import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './audio-player.module.scss';

type AudioPlayerElement = HTMLAudioElement;

export type AudioPlayerProps = React.ComponentPropsWithoutRef<'audio'>;

export const AudioPlayer = forwardRef<AudioPlayerElement, AudioPlayerProps>(
	({ className, ...rest }, ref) => (
		<audio className={join(c.AudioPlayer, className)} ref={ref} {...rest}>
			<track kind="captions" />
		</audio>
	),
);

AudioPlayer.displayName = 'AudioPlayer';
