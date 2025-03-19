import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async create(createProjectDto: CreateProjectDto) {
    try {
      const { link, sprint, user_email } = createProjectDto;
      const user = await this.findOneByUserId(user_email);
      const project = await prisma.project.create({
        data: {
          link: link,
          sprint: sprint,
          user_email: user.email,
        }
      });

      return project;
    } catch (error) {
      console.log
    }

  }

  async findAll() {
    return await prisma.project.findMany();
  }

  async findOne(id: number) {
    try {
      const project = await prisma.project.findUnique({
        where: { id: id },
      });
      if (project == null) {
        return "Project not found"
      }
      return project;
    } catch (error) {
      console.log(error)
    }

  }

  async findOneByUserId(user_email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: user_email },
      });
      if (user == null) {
        throw new Error("User not found")
      }
      return user;

    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try{
      return await prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
    }catch(error){
      console.log(error)
    }
  }

  async remove(id: number) {
    try{
      if(this.findOne(id) == null)
        return await prisma.project.delete({
          where: {id},
        });
    }catch(error){
      console.log(error)
    }
  }
}

