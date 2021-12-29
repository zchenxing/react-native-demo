import React from "react";

export interface AweSimpleNavigatorProps {
    centerTitle: string
    goBack: () => void
    rightActionEvent?: () => void
    rightActionTitle?: string
    rightActionIcon?: React.ReactNode
    rightActionEditable?: boolean
}
