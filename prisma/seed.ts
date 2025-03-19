import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()

async function main() {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash("12345", saltOrRounds);
    const user = {
        email: "leonardoms.2010@hotmail.com",
        name: 'leo',
        password: hash,
        role: 'ADMIN',
        matricula: "23200064",
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        course: "ES",
        github: "LeoMallets04",
        semester: "242",
        n_of_absences: 0,
        created_at: new Date(),
        projects: {
            create: [{
                link: "https://api.github.com/repos/LeoMallets04/Calculator",
                sprint: 1,
            }]
        }
    }
    const leo = await prisma.user.create({
        data: user
    })
    const user1={
        email: 'teste@gmail.com',
        name: 'teste',
        password: hash,
        role: 'NORMAL',
        matricula: "24106875",
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        course: "CC",
        github: "teste",
        semester: "242",
        n_of_absences: 0,
        created_at: new Date(),
        projects: {
            create: [{
                link: "https://api.github.com/repos/PedroKleinDavila/Weather-Web",
                sprint: 1,
            }]
        }
    }
    const teste = await prisma.user.create({
        data: user1
    })
    const event={
        title: "Evento 1",
        start_date: "2024-11-08T00:00:00.000Z",
        end_date: "2024-11-08T00:00:00.000Z",
    }
    const evento1 = await prisma.event.create({
        data: event
    })
    const evento2={
        title: "Evento 2",
        start_date: "2024-11-10T00:00:00.000Z",
        end_date: "2024-11-12T00:00:00.000Z",
    }
    const evento3 = await prisma.event.create({
        data: evento2
    })
    const card1={
        id: 1,
        title: "Calculator",
        description: "descrição",
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        image: "https://m.media-amazon.com/images/I/81JikRw3uLL.jpg",
        isBlocked: false,
        material: {
            create: [{
                name: "Aula 1",
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            },
            {
                name: "Aula 2",
                url: "https://www.youtube.com",
            },
            {
                name: "Aula 3",
                url: "https://stackoverflow.com/",
            }]
        }
    }
    const card2={
        id: 2,
        title: "API",
        description: "descrição",
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        image: "https://appmaster.io/api/_files/PqV7MuNwv89GrZvBd4LNNK/download/",
        isBlocked: false,
        material: {
            create: [{
                name: "Aula 1",
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            },
            {
                name: "Aula 2",
                url: "https://www.youtube.com",
            },
            {
                name: "Aula 3",
                url: "https://stackoverflow.com/",
            }]
        }
    }
    const card3={
        id: 3,
        title: "Backend",
        description: "descrição",
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf", 
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240701150157/Backend-Development.webp",
        isBlocked: false,
        material: {
            create: [{
                name: "Aula 1",
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            },
            {
                name: "Aula 2",
                url: "https://www.youtube.com",
            },
            {
                name: "Aula 3",
                url: "https://stackoverflow.com/",
            }]
        }
    }
    const card4={
        id: 4,
        title: "Portifolio",
        description: "descrição",
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        image: "https://neilpatel.com/wp-content/uploads/fly-images/52505/portfolio-1200x675-c.jpg",
        isBlocked: true,
        material: {
            create: [{
                name: "Aula 1",
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            },
            {
                name: "Aula 2",
                url: "https://www.youtube.com",
            },
            {
                name: "Aula 3",
                url: "https://stackoverflow.com/",
            }]
        }
    }
    const card5={
        id: 5,
        title: "Moodle Creatus",
        description: "descrição",
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAVBLmUpMgiIEt_oub48qODMOgbZPvCTt6g&s",
        isBlocked: true,
        material: {
            create: [{
                name: "Aula 1",
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            },
            {
                name: "Aula 2",
                url: "https://www.youtube.com",
            },
            {
                name: "Aula 3",
                url: "https://stackoverflow.com/",
            }]
        }
    }
    const createcard1= await prisma.cards.create({
        data: card1
    })
    const createcard2= await prisma.cards.create({
        data: card2
    })
    const createcard3= await prisma.cards.create({
        data: card3
    })
    const createcard4= await prisma.cards.create({
        data: card4
    })
    const createcard5= await prisma.cards.create({
        data: card5
    })

    console.log(createcard1);
    console.log(createcard2);
    console.log(createcard3);
    console.log(createcard4);
    console.log(createcard5);
}
main();