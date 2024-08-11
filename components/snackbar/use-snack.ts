import { useContext } from 'react';

import { SnackContext } from './snackbar';

// *----- export contextual  hook -----
export const useSnack = () => useContext(SnackContext);
