import {PositionDetail} from "@/types/positionDetail";

export interface PositionGroup {
    code: string;
    name: string;
    positions: PositionDetail[];
}