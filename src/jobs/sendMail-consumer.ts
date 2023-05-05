import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user.dto';

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJon(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe EversonCorporation <everson.corporate@gmail.com>',
      subject: 'Seja muito bem vindo(a)!',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On QueueActive ${job.name}`);
  }
}

// await this.mailService.sendMail({
//   to: createUser.email,
//   from: 'Equipe EversonCorporation <everson.corporate@gmail.com>',
//   subject: 'Seja muito bem vindo(a)!',
//   text: `Olá ${createUser.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
// });
