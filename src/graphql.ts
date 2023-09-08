
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateMemberInput {
    firstName: string;
    lastName: string;
    identityNumber?: Nullable<string>;
    birthday?: Nullable<Date>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    roleGroupId?: Nullable<number>;
    roleMinistryId?: Nullable<number>;
}

export interface UpdateMemberInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    identityNumber?: Nullable<string>;
    birthday?: Nullable<Date>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    roleGroupId?: Nullable<number>;
    roleMinistryId?: Nullable<number>;
}

export interface CreateSectorInput {
    sectorName: string;
    supervisorId?: Nullable<number>;
}

export interface UpdateSectorInput {
    sectorName?: Nullable<string>;
    supervisorId?: Nullable<number>;
}

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    identityNumber?: Nullable<string>;
    birthday?: Nullable<Date>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    roleGroupId: number;
    roleGroup?: Nullable<RoleGroup>;
    roleMinistryId: number;
    roleMinistry?: Nullable<RoleMinistry>;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: Nullable<DateTime>;
}

export interface RoleGroup {
    id: number;
    roleGroupName: string;
    members?: Nullable<Nullable<Member>[]>;
}

export interface RoleMinistry {
    id: number;
    roleMinistryName: string;
    members?: Nullable<Nullable<Member>[]>;
}

export interface IQuery {
    members(): Nullable<Member>[] | Promise<Nullable<Member>[]>;
    memberById(id: number): Nullable<Member> | Promise<Nullable<Member>>;
    sectors(): Nullable<Sector>[] | Promise<Nullable<Sector>[]>;
    sectorById(id: number): Nullable<Sector> | Promise<Nullable<Sector>>;
}

export interface IMutation {
    createMember(input: CreateMemberInput): Member | Promise<Member>;
    updateMember(id: number, input: UpdateMemberInput): Member | Promise<Member>;
    removeMember(id: number): Member | Promise<Member>;
    restoreMember(id: number): Member | Promise<Member>;
    createSector(input: CreateSectorInput): Sector | Promise<Sector>;
    updateSector(id: number, input: UpdateSectorInput): Sector | Promise<Sector>;
    removeSector(id: number): Sector | Promise<Sector>;
    restoreSector(id: number): Sector | Promise<Sector>;
}

export interface Sector {
    id: number;
    sectorName: string;
    supervisorId?: Nullable<number>;
    supervisor?: Nullable<Member>;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
