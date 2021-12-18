import { Platform } from "@pipeline/Types";
import { ProcessedData } from "@pipeline/preprocess/ProcessedData";
import { TOption } from "@report/components/FilterSelect";

export interface AuthorOption extends TOption {
    id: number;
    name: string;
    name_searchable: string;
    bot: boolean;
}

export interface ChannelOption extends TOption {
    id: number;
    name: string;
    name_searchable: string;
}

export interface Basic {
    platform: Platform;
    title: string;
    authors: AuthorOption[];
    channels: ChannelOption[];
}

export const computeBasic = (pd: ProcessedData): Basic => ({
    platform: pd.platform,
    title: pd.title,
    authors: pd.authors.map((a, i) => ({
        id: i,
        name: a.name,
        name_searchable: a.name_searchable,
        bot: a.bot,
    })),
    channels: pd.channels.map((a, i) => ({
        id: i,
        name: a.name,
        name_searchable: a.name_searchable,
    })),
});