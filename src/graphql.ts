
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

export interface IQuery {
    helloWord(): Nullable<string> | Promise<Nullable<string>>;
    members(): Nullable<Member>[] | Promise<Nullable<Member>[]>;
    memberById(id: number): Nullable<Member> | Promise<Nullable<Member>>;
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

export interface IMutation {
    createMember(input: CreateMemberInput): Member | Promise<Member>;
    updateMember(id: number, input: UpdateMemberInput): Member | Promise<Member>;
    removeMember(id: number): Member | Promise<Member>;
    restoreMember(id: number): Member | Promise<Member>;
}

export type DateTime = any;
type Nullable<T> = T | null;
