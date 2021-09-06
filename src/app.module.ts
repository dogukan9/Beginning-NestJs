import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { LoggerMiddleware } from './middleware';
@Module({
  imports: [AuthModule, MoviesModule, MongooseModule.forRoot("your mongodb connect url :)")],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "auth/user/:id", method: RequestMethod.ALL },
        { path: "auth/getAllUsers", method: RequestMethod.ALL },
        { path: "movies/*", method: RequestMethod.ALL });




    // { path: "*", method: RequestMethod.ALL });
  }




  /*
    if we have different Middlewares we can use it like this
   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "auth/getAllUsers", method: RequestMethod.ALL },
        { path: "movies/saveMovie", method: RequestMethod.ALL }),
      consumer
        .apply(DifferentMiddleware)
        .forRoutes(
          { path: "auth/user/:id", method: RequestMethod.ALL });


    // { path: "*", method: RequestMethod.ALL });
  }
  
  
  */

}
