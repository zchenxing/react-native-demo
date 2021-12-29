import { UserEventProps } from "../interface/work";

const WorkHelp = {
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


    /**
     * 判断用户是否被关注
     * @param userEvents
     * @param useType
     */
    userEventExist: (
        userEvents: UserEventProps[] | null | undefined,
        useType: number,
    ): {isExist: boolean; existIndex: number} => {

        let isExist: boolean = false
        let existIndex: number = -1

        // 判断是否关注
        if (userEvents) {
            userEvents.forEach((event, index) => {
                if (event.event_type === useType) {
                    isExist = true
                    existIndex = index
                }
            })
        }

        return {
            isExist,
            existIndex
        }
    },


};


export default WorkHelp
