import React from 'react';
import {DataType, useDataHook} from "./useDataHook";
import {Group} from "@visx/group";
import {Bar} from "@visx/shape";
import {Label} from "@visx/annotation";


export function BarGraph() {
    const {arrayOfObj, width, height, xPoint, yPoint, yMax, xScale} = useDataHook();

    return (
        <svg width={width} height={height}>
            {arrayOfObj.map((d: DataType, i: number) => {
                const barHeight = yMax - yPoint(d);

                return (
                    <>
                        <Label title={d.month}/>
                        <h1>{d.month}</h1>
                        <Group key={`bar-${i}`}>
                            <Bar
                                x={xPoint(d)}
                                y={yMax - barHeight}
                                height={barHeight}
                                width={xScale.bandwidth()}
                                fill="#047d95"
                            />
                            <text
                                x={xPoint(d)}
                                y={yMax + 20}
                                fontSize={14}
                            >
                                {d.month}
                            </text>
                        </Group>
                    </>
                );
            })}
        </svg>
    );
}

