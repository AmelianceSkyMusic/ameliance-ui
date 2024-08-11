import { forwardRef } from 'react';

import c from './audio-player.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

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
