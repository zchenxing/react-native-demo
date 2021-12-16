import {action, observable} from 'mobx';

type CommentType = {
    offsetY: number;
    data: any[];
};

interface DataType {
    [id: string]: CommentType;
}

export class CommentSheetStore {
    @observable sheetData: DataType = {};

    @action.bound setSheetData = (values: DataType) => {

        this.sheetData = values;
    };

    @action.bound addDataToComment = (
        sheetId: string,
        values: CommentType,
    ) => {

        this.sheetData[sheetId] = values;
    };

    @action.bound deleteSheetId = (sheetId: string) => {

        delete this.sheetData[sheetId];
    };
}
