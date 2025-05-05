import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GitTokenService } from './git_token.service';
import { url } from 'inspector';

@Controller('git-api')
export class GitTokenController {
    constructor( 
        private readonly gitTokenService: GitTokenService
      ) {}
    
    @UseGuards(AuthGuard)
    @Roles('ADMIN', 'NORMAL')
    @Post('access-app-token')
    postAppToken(){
      return this.gitTokenService.getGitTokenWithGitApp();
    }


    @UseGuards(AuthGuard)
    @Roles('ADMIN', 'NORMAL')
    @Post('repos-auth')
    postRepoAuth(@Body('url') url:string){
      return this.gitTokenService.getRepoData(url);
    }
}
