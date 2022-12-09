import {gql, useQuery} from "@apollo/client";
import {scaleBand, scaleLinear} from "@visx/scale";

export type DataType = { id: string, month: string };
export type GraphData = { month: string, data: DataType[] }

export const useDataHook = () => {
    const {data: correctData, loading, error} = useQuery(gql`
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

    const posts = correctData?.allPosts;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let filtered: DataType[] = [];

    posts?.forEach((item: {
        id: string,
        month: number;
        published: boolean,
        createdAt: string
    }) => {
        if (item.published && (parseInt(item.createdAt) > limitInSeconds)) {
            filtered.push({
                id: item.id,
                month: monthNames[new Date(parseInt(item.createdAt, 10)).getMonth()]
            })
        }
    })

    const groupBy = (arr: DataType[], keys: (keyof DataType)[]): { [key: string]: DataType[] } => {
        return arr.reduce((storage, item) => {
            const objKey = keys.map(key => `${item[key]}`).join(':');
            if (storage[objKey]) {
                storage[objKey].push(item);
            } else {
                storage[objKey] = [item];
            }
            return storage;
        }, {} as { [key: string]: DataType[] });
    }
    const grouped: { [p: string]: DataType[] } = groupBy(filtered, ['month']);

    const arrayOfObj = Object.entries(grouped).map((e) => {
        return {month: e[0], data: e[1]}
    });

    const width = 1000;
    const height = 500;
    const margin = {top: 20, bottom: 20, left: 20, right: 20};

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = (d: GraphData) => d.month;
    const y = (d: GraphData) => d.data?.length;

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
    const compose = (scale: any, accessor: any) => (arrayOfObj: GraphData) => scale(accessor(arrayOfObj));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    return {arrayOfObj, width, height, xPoint, yPoint, yMax, xScale, x, y, loading, error};
}