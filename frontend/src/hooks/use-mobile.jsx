import * as React from "react";

const MOBILE_BREAKOUT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(undefined);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKOUT - 1}px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKOUT);
        };

        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKOUT);

        return () => mql.removeEventListener('change', onChange);
    }, []);

    return !!isMobile;
}