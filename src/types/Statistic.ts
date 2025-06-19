import {StatisticDetail} from "@/types/StatisticDetail";

export interface Statistic {
    detail: StatisticDetail;
    games: number;
    goals: number;
    average: number;
}