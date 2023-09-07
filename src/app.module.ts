import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HelloWordModule } from './modules/hello-word/hello-word.module';
import {
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
} from 'graphql-scalars';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
        // DateTime: DateTimeResolver,
        // Date: DateResolver,
        // Email: EmailAddressResolver,
      },
    }),
    HelloWordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
