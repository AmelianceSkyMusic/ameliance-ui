import { forwardRef, useEffect, useState } from 'react';

import { Typography } from '../typography';

import c from './avatar.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type AvatarElement = HTMLDivElement;

export type AvatarProps = React.ComponentPropsWithoutRef<'div'> & {
   src?: string;
   alt?: string;
   char?: string;
   color?: string;
   size?: ComponentSizes;
};

export const Avatar = forwardRef<AvatarElement, AvatarProps>(
   ({ src, alt, char, color, size = 'default', onClick, children, className, ...rest }, ref) => {
      const [imgUrl, setImgUrl] = useState('');

      useEffect(() => {
         if (src) setImgUrl(src);
      }, [src]);

      const componentClass = [onClick && c.clickable];

      const sizeClass = size && c[size];

      const handleImageOnError = () => {
         setImgUrl('');
      };

      return (
         <div
            onClick={onClick}
            className={join(c.Avatar, className, componentClass)}
            ref={ref}
            {...rest}
         >
            {!imgUrl && children && (
               <div className={join(c.charContainer, sizeClass)} style={{ backgroundColor: color }}>
                  {children}
               </div>
            )}
            {!!imgUrl && (
               // eslint-disable-next-line @next/next/no-img-element
               <img
                  className={join(c.img, sizeClass)}
                  src={imgUrl}
                  alt={alt}
                  onError={handleImageOnError}
               />
            )}
            {!imgUrl && !children && (
               <div className={join(c.charContainer, sizeClass)} style={{ backgroundColor: color }}>
                  <Typography display="h5" className={c.char}>
                     {char}
                  </Typography>
               </div>
            )}
         </div>
      );
   },
);

Avatar.displayName = 'Avatar';
