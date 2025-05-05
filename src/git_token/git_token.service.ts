import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GitToken } from './entities/git_token.entity';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as dotenv from 'dotenv'
import { permission } from 'process';


dotenv.config();

//Serviço responsável por gerar o token de autenticação da API do GITHUB

@Injectable()
export class GitTokenService {
    
    //Método que pega o contéudo do token JWT gerado e atribuí os valores do token
    //a uma entidade GitToken e retorna ela, cuja será usada em tempo de execução para validar as requisições do GitHub APP
    //Serve para gerar o GitToken usando o Git App para aumentar a quantidade de requisições de uma lista 
    //de repositórios privados que são selecionados pela comporação (60 req p/hora -> 5000 req p/hora)
    async getGitTokenWithGitApp(): Promise<GitToken> {

        const jwtToken = this.generateJwtForGitApp();

        try {
            const response = await axios.post(
                `https://api.github.com/app/installations/${process.env.INSTALLATION_ID}/access_tokens`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        Accept: "application/vnd.github+json",
                    },
                }
            );
    
            return {
                token: response.data.token,
                expires_at: response.data.expires_at,
                permissions: response.data.permissions,
                repository_selection: response.data.repository_selection,
            };
        } catch(error) {
            console.log(error);
            throw new HttpException('Erro ao obter token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }

    //Serve para gerar o token que aumenta a quantidade de requisições para repositórios públicos
    //Ao chamar a API do GitHub (60 req p/hora -> 5000 req p/hora) 
    async getGitPersonalToken():Promise<GitToken> {
        return {
            token: process.env.GITHUB_API_PERSONAL_TOKEN,
            expires_at: null,
            permissions: {},
            repository_selection: 'all',
        };
    }


    //Geração de um JWT (JSON Web Token), um token de autenticação temporário utilizado para autenticar
    //o GitHub App junto à API do GitHub, assinado com a chave privada .pem (PRIVATE_KEY) do aplicativo.
    private generateJwtForGitApp(): string{
        const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf-8');

        const payload = {
            iat: Math.floor(Date.now()/1000 ),
            exp: Math.floor(Date.now()/1000 ) + 600,
            iss: process.env.APP_ID,
        };

        return jwt.sign(payload,privateKey, {algorithm: 'RS256'})
    }
     
}
