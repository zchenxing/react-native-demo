import React from 'react';

export interface ScreenBaseProps {
    children?: React.ReactNode;
    showPlaceholder?: boolean
    placeholderComponent?: React.ReactNode
    onReload?: () => void
    nothingPage?: {
        picture: any;
        title?: string;
    };
}
