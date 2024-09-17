import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@infra/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from '@infra/auth/roles.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
