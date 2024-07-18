import { Backdrop } from '../backdrop/backdrop';
import { Block } from '../blocks/block';
import { LoaderLine } from '../loader/loader-line';
import { Portal } from '../portal';

import c from './loader-overlay.module.scss';

export function LoaderOverlay() {
   return (
      <Portal>
         <Block className={join(c.LoaderOverlay)}>
            <Backdrop show />
            <LoaderLine />
         </Block>
      </Portal>
   );
}
