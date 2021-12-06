/*
This is the interface generated after preprocessing

It needs to be trivally serializable because it will be stored in the report file
*/

import { Platform } from "@pipeline/Types";

type ID = string;
type DateStr = string; // YYYY-MM-DD

export interface ProcessedData {
    platform: Platform;
    title: string;
    minDate: DateStr;
    maxDate: DateStr;

    channels: Channel[];
    authors: Author[];
}

export interface Channel {
    id: ID;
    name: string;
    name_searchable: string;
}

export interface Author {
    id: ID;
    name: string;
    name_searchable: string;
    bot: boolean;

    aggrs: {
        [date: DateStr]: {
            [id: ID]: DayAggregation; // channel ID
        };
    };
}

export type DayAggregation = {
    m: number;
    w: { [word: string]: number };
    e: { [emoji: string]: number };
};