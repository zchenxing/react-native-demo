const WorkHelp: any = {
    /**
     * 根据id，获取数据源的下标
     * @param id
     * @param dataSource
     */
    getDataSourceIndex: (id: string, dataSource: any[]) => {
        let resultIndex: number = -1;

        for (const index in dataSource) {
            if (dataSource[index].id === id) {
                resultIndex = parseInt(index, 10);
                break;
            }
        }

        return resultIndex;
    },
};


export default WorkHelp
