import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GitToken } from './entities/git_token.entity';
import { GitRepo } from './entities/git_repo.entity';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as dotenv from 'dotenv'
import { permission } from 'process';


dotenv.config();

//Serviço responsável por gerar o token de autenticação da API do GITHUB

@Injectable()
export class GitTokenService {

    async getRepoData(url:string): Promise<GitRepo | null>{
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_API_PERSONAL_TOKEN}`,
                        Accept: `application/vnd.github+json`,
                        'X-GitHub-Api-Version': '2022-11-28',
                    }
                }
            );

            const json_data = await response.data;

            const repo_name = json_data.name ?? "";
            const repo_description = json_data.description ?? "";
            //Aqui chamamos a função getLanguagesData() passando a URL das linguagens que contêm na response
            const repo_languages = await this.getLanguageData(json_data.languages_url);
            const repo_url = json_data.html_url ?? "";


            //Essa parte aqui é para poder ver a quantidade total de requisições disponíveis
            //É meramente para visualizar, caso não deseje pode só comentar mesmo
            
            //->
            const response_test = await axios.get("https://api.github.com/rate_limit", {
                headers: {
                  Authorization: `token ${process.env.GITHUB_API_PERSONAL_TOKEN}`,
                  Accept: 'application/vnd.github+json'
                }
              });
              
            console.log("Rate limit info:", response_test.data);
            //<-

            return {
            repo_name,
            repo_description,
            repo_languages,
            repo_url
            };


        } catch (error) {
            console.error("Erro ao buscar os dados do repositório:", error);
            return null;
        }
    }
    
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

    //Aqui pegamos as linguagens usadas em um repositório com base na URL das linguagens cujo está dentro
    //da response dos dados obtidos pela API do GitHub
    async getLanguageData(languages_url: string): Promise<string[]> {
        try {
            const response_languages = await axios.get(languages_url);
        
            const json_data = await response_languages.data;
            return Object.keys(json_data);
        } catch (error) {
            console.error("Erro ao buscar linguagens: ", error);
            return [];
        }
    }
     
}
