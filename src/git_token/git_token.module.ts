import { Module } from '@nestjs/common';
import { GitTokenService } from './git_token.service';
import { GitTokenController } from './git_token.controller';

@Module({
  providers: [GitTokenService],
  controllers: [GitTokenController]
})
export class GitTokenModule {}
