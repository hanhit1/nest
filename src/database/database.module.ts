import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsProvider } from './providers/options.provider';
import { connectionProvider } from './providers/provider.connection';
@Global()
  @Module({
    providers: [
      connectionProvider,
      OptionsProvider,
    ],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: options.host || 'localhost',
          port: options.port || 3306,
          username: options.username || 'hanhpro',
          password: options.password || '',
          database: options.database || 'test',
          entities: entities,
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
