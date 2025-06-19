import {PositionGroup} from "@/types/positionGroup";

export interface Invitado {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    average: number;
    positions: PositionGroup[];
}