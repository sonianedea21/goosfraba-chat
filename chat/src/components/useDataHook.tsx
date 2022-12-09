import {ApolloError, gql, useQuery} from "@apollo/client";
import {AnyScaleBand} from "@visx/shape/lib/types";
import {scaleBand, scaleLinear} from "@visx/scale";
import {useCallback, useMemo} from "react";

export type RawDataType = { id: string, month: string };
export type DataType = { month: string, data: RawDataType[] }


type DataHookType = {
    arrayOfObj: DataType[],
    width: number,
    height: number,
    xPoint: (arrayOfObj: DataType) => any,
    yPoint: (arrayOfObj: DataType) => any,
    yMax: number,
    xScale: AnyScaleBand,
    loading: boolean,
    error: ApolloError | undefined,
}

export const useDataHook = (): DataHookType => {
    const {loading, error, data} = useQuery(gql`
    query AllPosts {
      allPosts(count: 1000) {
        id
        published
        createdAt
        }
      }
    `);

    const limitYear = new Date('2019-01-01T00:00:00');
    const limitInSeconds = Math.floor(limitYear.getTime());
    const posts = data?.allPosts;

    const filtered: RawDataType[] = useMemo(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return posts?.forEach((item: {
            id: string,
            month: number;
            published: boolean,
            createdAt: string
        }) => {
            if (item.published && (parseInt(item.createdAt) > limitInSeconds)) {
                return ({
                    id: item.id,
                    month: monthNames[new Date(parseInt(item.createdAt, 10)).getMonth()]
                })
            }
        })
    }, [limitInSeconds, posts])


    const groupBy = useCallback((arr: RawDataType[], keys: (keyof RawDataType)[]): { [key: string]: RawDataType[] } => {
        return arr?.reduce((storage, item) => {
            const objKey = keys.map(key => `${item[key]}`).join(':');
            if (storage[objKey]) {
                storage[objKey].push(item);
            } else {
                storage[objKey] = [item];
            }
            return storage;
        }, {} as { [key: string]: RawDataType[] });
    }, [])

    const grouped: { [p: string]: RawDataType[] } = groupBy(filtered, ['month']);

// dummy data in case faker is down
    const dummy = {
        "January": [{id: 'test', month: 'jan'}, {id: 'test', month: 'jan'}],
        "April": [{id: 'tesdst', month: 'apr'}],
        "February": [{id: 'tesdsst', month: 'feb'}],
        "March": [{id: 'tessdddt', month: 'mar'}],
    }

    const arrayOfObj: DataType[] = Object.entries(grouped || []).map((e) => {
        return {month: e[0], data: e[1]}
    });

    const width = 1000;
    const height = 500;
    const margin = {top: 20, bottom: 20, left: 20, right: 20};

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = (d: DataType) => d.month;
    const y = (d: DataType) => d.data?.length;

// Scale graph by data
    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: arrayOfObj.map(x),
        padding: 0.4,
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...arrayOfObj.map(y))],
    });

// Compose together the scale and accessor functions to get point functions
    const compose = (scale: any, accessor: any) => (arrayOfObj: DataType) => scale(accessor(arrayOfObj));

    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    return {arrayOfObj, width, height, xPoint, yPoint, yMax, xScale, loading, error};
}