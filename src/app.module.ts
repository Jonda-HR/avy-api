import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { MemberModule } from './modules/member/member.module';
import { SectorModule } from './modules/sector/sector.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HandleErrorModule } from './utilities/handleError/handleError.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.ALLOW_GRAPHQL_PLAYGROUND === 'true',
      plugins: [
        process.env.NODE_ENV === 'prod'
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      debug: process.env.APOLLOGQL_ALLOW_DEBUG === 'true',
      //To allow for PubSub
      installSubscriptionHandlers: true,
      //Fallback for PubSub
      subscriptions: {
        'graphql-ws': true,
      },
      //grab all ~.graphql files in the project and place them in memory
      typePaths: ['./**/*.graphql'],
      //generate typings automatically from the AST
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      resolvers: {
        DateTime: DateTimeResolver,
        Date: DateResolver,
      },
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.json(),
          winston.format.ms(),
          utilities.format.nestLike('AVY', {
            colors: true,
            prettyPrint: true,
          }),
        ),
        transports: [new winston.transports.Console()],
        exceptionHandlers: [new winston.transports.Console()],
      }),
      inject: [],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PWD),
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl:
          process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null,
      },
      logging: [process.env.DB_LOGGING === 'true' ? 'query' : null],
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC_STATUS == 'true',
    }),
    MemberModule,
    SectorModule,
    UserModule,
    AuthModule,
    HandleErrorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
