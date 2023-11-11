import React, { ReactNode } from 'react';

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div id="root-layout">{children}</div>;
};

export default RootLayout;
