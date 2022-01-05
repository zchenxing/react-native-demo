import React from "react";

export interface ScreenBaseProps {
    children?: React.ReactNode;
    showPlaceholder?: boolean
    onReload?: () => void
    nothingPage?: {
        picture: any;
        title?: string;
    };
}
