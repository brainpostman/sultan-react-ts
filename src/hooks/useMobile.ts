import { useEffect, useState } from 'react';
const useMobile = (mediaQueryList: MediaQueryList) => {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        handleWindowResize();
        function handleWindowResize() {
            if (mediaQueryList.matches) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
        mediaQueryList.addEventListener('change', handleWindowResize);
        return () => {
            mediaQueryList.removeEventListener('change', handleWindowResize);
        };
    }, []);
    return mobile;
};

export default useMobile;
