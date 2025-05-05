import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { CardsModule } from './cards/cards.module';
import { MaterialModule } from './material/material.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { GitTokenModule} from './git_token/git_token.module';

@Module({
  imports: [UserModule, EventModule, CardsModule, MaterialModule, ProjectModule, AuthModule, GitTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}