'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { join } from 'ameliance-scripts';

import { mergeRefs } from '~/submodules/ameliance-ui/helpers/merge-refs';
import { writeTextToClipboard } from '~ameliance-scripts/write-text-to-clipboard';

import { Button } from '../../../button';
import { ClipboardIcon } from '../../../icons/svg/clipboard';
import { useSnack } from '../../../snackbar/use-snack';

import typography from '../../../typography/typography.module.scss';
import c from './code.module.scss';

export type CodeElement = HTMLPreElement;

export type CodeProps = React.ComponentPropsWithoutRef<'pre'>;

export const Code = forwardRef<CodeElement, CodeProps>(({ children, className, ...rest }, ref) => {
	const { addSnack } = useSnack();
	const preRef = useRef<CodeElement>(null);
	const codeRef = useRef<HTMLElement | null>(null);
	const [isCode, setIsCode] = useState(false);

	useEffect(() => {
		const codeElement = preRef.current?.querySelector('code');
		if (codeElement) {
			codeRef.current = codeElement;
			setIsCode(true);
		}
	}, [preRef]);

	const handleIconOnClick = async () => {
		const code = codeRef.current?.textContent;

		if (!code) return;

		const isCopied = await writeTextToClipboard(code);
		if (isCopied) {
			addSnack({
				title: 'Скопійовано:',
				message: code,
			});
		} else {
			addSnack({
				type: 'error',
				message: 'Не вдалося скопіювати. Напишіть мені в Телеграм!',
			});
		}
	};
	return (
		<pre className={join(c.root, typography.code)} ref={mergeRefs([preRef, ref])} {...rest}>
			{/* <code className={join(c.code, className)} ref={codeRef}> */}
			{children}
			{isCode && (
				<Button size="tiny" type="text" className={c.copy} onClick={handleIconOnClick}>
					<ClipboardIcon size="xs" />
				</Button>
			)}

			{/* </code> */}
		</pre>
	);
});

Code.displayName = 'Code';
