import type { BaseEntity } from "typeorm";

export type ParametersWithoutFirst<T extends (...args: any) => any> = T extends (_: any, ...args: infer P) => any
    ? P
    : never;
    
export type OmitTypeOrm<T extends BaseEntity> = Omit<T, keyof BaseEntity | "updatedAt" | "createdAt">;