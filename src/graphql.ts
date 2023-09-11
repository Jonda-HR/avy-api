
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum validRoles {
    user = "user",
    superUser = "superUser",
    admin = "admin"
}

export interface SignUpInput {
    userName: string;
    password: string;
    roleUser: validRoles;
}

export interface SignInInput {
    userName: string;
    password: string;
}

export interface CreateDinnerInput {
    dinnerName: string;
    price: number;
}

export interface UpdateDinnerInput {
    dinnerName?: Nullable<string>;
    price?: Nullable<number>;
}

export interface CreateGrowthGroupInput {
    growthGroupName: string;
    headquarters?: Nullable<string>;
    sectorId: number;
}

export interface UpdateGrowthGroupInput {
    growthGroupName?: Nullable<string>;
    headquarters?: Nullable<string>;
    sectorId?: Nullable<number>;
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

export interface CreateMinistryInput {
    ministryName: string;
}

export interface UpdateMinistryInput {
    ministryName?: Nullable<string>;
}

export interface CreateSectorInput {
    sectorName: string;
    supervisorId?: Nullable<number>;
}

export interface UpdateSectorInput {
    sectorName?: Nullable<string>;
    supervisorId?: Nullable<number>;
}

export interface CreateTicketsInput {
    dinnerId: number;
    growthGroupId: number;
    numberTickets: number;
}

export interface UpdateTicketInput {
    isPaid?: Nullable<boolean>;
    growthGroupId?: Nullable<number>;
}

export interface CreateUserInput {
    userName: string;
    password: string;
    roleUser: validRoles;
}

export interface UpdateUserInput {
    userName?: Nullable<string>;
    password?: Nullable<string>;
    roleUser?: Nullable<validRoles>;
}

export interface AuthResponse {
    token: string;
    user?: Nullable<User>;
}

export interface IQuery {
    revalidate(): AuthResponse | Promise<AuthResponse>;
    dinners(): Nullable<Dinner>[] | Promise<Nullable<Dinner>[]>;
    dinnerById(id: number): Nullable<Dinner> | Promise<Nullable<Dinner>>;
    growthGroups(): Nullable<GrowthGroup>[] | Promise<Nullable<GrowthGroup>[]>;
    growthGroupById(id: number): Nullable<GrowthGroup> | Promise<Nullable<GrowthGroup>>;
    members(): Nullable<Member>[] | Promise<Nullable<Member>[]>;
    memberById(id: number): Nullable<Member> | Promise<Nullable<Member>>;
    ministries(): Nullable<Ministry>[] | Promise<Nullable<Ministry>[]>;
    ministryById(id: number): Nullable<Ministry> | Promise<Nullable<Ministry>>;
    sectors(): Nullable<Sector>[] | Promise<Nullable<Sector>[]>;
    sectorById(id: number): Nullable<Sector> | Promise<Nullable<Sector>>;
    tickets(): Nullable<Ticket>[] | Promise<Nullable<Ticket>[]>;
    ticketById(id: number): Nullable<Ticket> | Promise<Nullable<Ticket>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    userById(id: string): Nullable<User> | Promise<Nullable<User>>;
    userByName(userName: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signUp(input?: Nullable<SignUpInput>): AuthResponse | Promise<AuthResponse>;
    signIn(input?: Nullable<SignInInput>): AuthResponse | Promise<AuthResponse>;
    createDinner(input: CreateDinnerInput): Dinner | Promise<Dinner>;
    updateDinner(id: number, input: UpdateDinnerInput): Dinner | Promise<Dinner>;
    removeDinner(id: number): Dinner | Promise<Dinner>;
    restoreDinner(id: number): Dinner | Promise<Dinner>;
    createGrowthGroup(input: CreateGrowthGroupInput): GrowthGroup | Promise<GrowthGroup>;
    updateGrowthGroup(id: number, input: UpdateGrowthGroupInput): GrowthGroup | Promise<GrowthGroup>;
    removeGrowthGroup(id: number): GrowthGroup | Promise<GrowthGroup>;
    restoreGrowthGroup(id: number): GrowthGroup | Promise<GrowthGroup>;
    createMember(input: CreateMemberInput): Member | Promise<Member>;
    updateMember(id: number, input: UpdateMemberInput): Member | Promise<Member>;
    removeMember(id: number): Member | Promise<Member>;
    restoreMember(id: number): Member | Promise<Member>;
    createMinistry(input: CreateMinistryInput): Ministry | Promise<Ministry>;
    updateMinistry(id: number, input: UpdateMinistryInput): Ministry | Promise<Ministry>;
    removeMinistry(id: number): Ministry | Promise<Ministry>;
    restoreMinistry(id: number): Ministry | Promise<Ministry>;
    createSector(input: CreateSectorInput): Sector | Promise<Sector>;
    updateSector(id: number, input: UpdateSectorInput): Sector | Promise<Sector>;
    removeSector(id: number): Sector | Promise<Sector>;
    restoreSector(id: number): Sector | Promise<Sector>;
    createTicket(input: CreateTicketsInput): Nullable<Ticket>[] | Promise<Nullable<Ticket>[]>;
    updateTicket(id: number, input: UpdateTicketInput): Ticket | Promise<Ticket>;
    paidDinner(code: string, dinnerId: number): Ticket | Promise<Ticket>;
    removeTicket(id: number): Ticket | Promise<Ticket>;
    restoreTicket(id: number): Ticket | Promise<Ticket>;
    createUser(input: CreateUserInput): User | Promise<User>;
    updateUser(id: string, input: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): User | Promise<User>;
    restoreUser(id: string): User | Promise<User>;
}

export interface Dinner {
    id: number;
    dinnerName: string;
    price: number;
    raisedMoney: number;
    tickets?: Nullable<Nullable<Ticket>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    deletedAt?: Nullable<Date>;
}

export interface GrowthGroup {
    id: number;
    growthGroupName: string;
    headquarters?: Nullable<string>;
    sectorId: number;
    sector?: Nullable<Sector>;
    tickets?: Nullable<Nullable<Ticket>[]>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Nullable<Date>;
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

export interface Ministry {
    id: number;
    ministryName: string;
    members?: Nullable<Nullable<Member>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    deletedAt?: Nullable<Date>;
}

export interface Sector {
    id: number;
    sectorName: string;
    supervisorId?: Nullable<number>;
    supervisor?: Nullable<Member>;
    growthGroups?: Nullable<Nullable<GrowthGroup>[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: Nullable<DateTime>;
}

export interface Ticket {
    id: number;
    code?: Nullable<string>;
    isPaid?: Nullable<boolean>;
    dinnerId: number;
    dinner?: Nullable<Dinner>;
    growthGroupId: number;
    growthGroup?: Nullable<GrowthGroup>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    deletedAt?: Nullable<Date>;
}

export interface User {
    id: string;
    userName?: Nullable<string>;
    roleUser: string;
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
