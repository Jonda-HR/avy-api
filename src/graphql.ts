
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SingUpInput {
    userName: string;
    password: string;
}

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

export interface CreateUserInput {
    userName: string;
    password: string;
    roleUserId: number;
}

export interface UpdateUserInput {
    userName?: Nullable<string>;
    password?: Nullable<string>;
    roleUserId?: Nullable<number>;
}

export interface AuthResponse {
    token: string;
    user?: Nullable<User>;
}

export interface IMutation {
    singUp(input?: Nullable<SingUpInput>): AuthResponse | Promise<AuthResponse>;
    createMember(input: CreateMemberInput): Member | Promise<Member>;
    updateMember(id: number, input: UpdateMemberInput): Member | Promise<Member>;
    removeMember(id: number): Member | Promise<Member>;
    restoreMember(id: number): Member | Promise<Member>;
    createSector(input: CreateSectorInput): Sector | Promise<Sector>;
    updateSector(id: number, input: UpdateSectorInput): Sector | Promise<Sector>;
    removeSector(id: number): Sector | Promise<Sector>;
    restoreSector(id: number): Sector | Promise<Sector>;
    createUser(input: CreateUserInput): User | Promise<User>;
    updateUser(id: number, input: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): User | Promise<User>;
    restoreUser(id: number): User | Promise<User>;
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
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    userById(id: number): Nullable<User> | Promise<Nullable<User>>;
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

export interface User {
    id: number;
    userName?: Nullable<string>;
    roleUserId: number;
    roleUser?: Nullable<RoleUser>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    deletedAt?: Nullable<Date>;
}

export interface RoleUser {
    id: number;
    roleUserName: string;
    users?: Nullable<Nullable<User>[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
