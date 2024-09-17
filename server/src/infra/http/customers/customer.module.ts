import { CreateCustomerService } from '@app/use-cases/customer/create-customer-service';
import { EditCustomerService } from '@app/use-cases/customer/edit-customer-service';
import { ListCustomersService } from '@app/use-cases/customer/list-customers-service';
import { ShowCustomerService } from '@app/use-cases/customer/show-customer-service';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { DeleteCustomerService } from '@app/use-cases/customer/delete-customer-service';
// import { RolesGuard } from '../../../infra/auth/roles.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthMiddleware } from '@infra/middleware/auth.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CreateCustomerService,
    ListCustomersService,
    ShowCustomerService,
    EditCustomerService,
    DeleteCustomerService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
// export class CustomerModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('*');
//   }
// }
export class CustomerModule {}
