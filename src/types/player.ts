import {PositionGroup} from "@/types/positionGroup";
import {Attribute} from "@/types/attribute";
import {Statistic} from "@/types/Statistic";

export interface Player {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    user: string | null;
    positions: PositionGroup[];
    attributes: Attribute[];
    statistic: Statistic;
}