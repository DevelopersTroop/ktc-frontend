import { useContext } from 'react';
import { HeaderContext } from './header-provider';

const useHeader = () => {
    return useContext(HeaderContext);
};

export default useHeader;