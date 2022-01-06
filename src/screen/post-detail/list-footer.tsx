import React from 'react';
import {
    Fade,
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
} from 'rn-placeholder';
import AweLoadMore from '../../components/awe-load-more';

interface IProps {
    initLoading: boolean;
    total: number;
    moreLoading: boolean;
    hasMoreData: boolean;
    onLoadMoreData: () => void;
}

const PostDetailFooter: React.FC<IProps> = (props: IProps) => {

    // 最多只展示10条占位
    const listArr = React.useRef(
        Array.from(new Array(Math.min(props.total, 10)).keys()),
    );

    return props.initLoading ? (
        <>
            {listArr.current.map(val => (
                <Placeholder
                    key={val}
                    Animation={Fade}
                    style={{
                        padding: 20,
                        paddingBottom: 0,
                    }}
                    Left={PlaceholderMedia}>
                    <PlaceholderLine width={30} />
                    <PlaceholderLine />
                </Placeholder>
            ))}
        </>
    ) : (
        <AweLoadMore
            loading={props.moreLoading}
            hasMoreData={props.hasMoreData}
            handleNoMoreData={props.onLoadMoreData}
        />
    );
};

export default PostDetailFooter;
