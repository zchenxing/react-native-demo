import React from 'react';
import {ActionSheet, SheetItem} from 'action-sheet-rn';
import {useLanguage} from '../../../language';
import {CommentActionProps} from './type';

const CommentActionSheet: React.FC<CommentActionProps> = (
    props: CommentActionProps,
) => {

    const handleDeleteItem = () => {
        props.onDelete && props.onDelete()
        props.onClose()
    };

    const handleReply = () => {
        props.onReply()
        props.onClose()
    };

    const handleCopy = () => {
        props.onCopy()
        props.onClose()
    }

    return props.visible ? (
        <ActionSheet
            title={useLanguage.action_sheet_title}
        >
            <SheetItem onPress={handleCopy}>{useLanguage.copy}</SheetItem>
            <SheetItem onPress={handleReply}>{useLanguage.reply}</SheetItem>

            {
                props.showDelete &&
                <SheetItem type="remove" onPress={handleDeleteItem}>
                    {useLanguage.delete}
                </SheetItem>
            }

            <SheetItem onPress={props.onClose}>{useLanguage.cancel}</SheetItem>
        </ActionSheet>
    ) : (
        <></>
    );
};

export default CommentActionSheet;
