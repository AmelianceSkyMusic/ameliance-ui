import { Block } from '../blocks/block';
import { Portal } from '../portal';
import type { SnackProps } from './snack';
import { Snack } from './snack';

import c from './snacks-container.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

interface SnacksContainer {
   snacks: SnackProps[];
   position?: {
      horizontal: 'left' | 'center' | 'right';
      vertical: 'top' | 'center' | 'bottom';
   };
}

export function SnacksContainer({
   snacks,
   position = {
      horizontal: 'right',
      vertical: 'top',
   },
}: SnacksContainer) {
   const componentPositionClass = c[`${position.horizontal}-${position.vertical}`];

   if (!snacks || snacks.length <= 0) return null;

   return (
      <Portal>
         <Block className={join(c.root, componentPositionClass)}>
            <>
               {snacks.map((snack) => (
                  <Snack
                     key={snack.id}
                     id={snack.id}
                     message={snack.message}
                     title={snack.title}
                     type={snack.type}
                     size={snack.size}
                     position={snack.position}
                     oneLine={snack.oneLine}
                     onCloseButtonClick={snack.onCloseButtonClick}
                     duration={snack.duration}
                  />
               ))}
            </>
         </Block>
      </Portal>
   );
}
