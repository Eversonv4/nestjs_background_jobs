import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDTO } from './create-user.dto';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {
  constructor(
    private sendMailService: SendMailProducerService, // private mailService: MailerService
  ) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO) {
    // await this.mailService.sendMail({
    //   to: createUser.email,
    //   from: 'Equipe EversonCorporation <everson.corporate@gmail.com>',
    //   subject: 'Seja muito bem vindo(a)!',
    //   text: `Olá ${createUser.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
    // });

    await this.sendMailService.sendMail(createUser);

    return createUser;
  }
}
