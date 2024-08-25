import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';
import { User } from 'src/user/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ActaRO)
    private readonly actaRoRepository: Repository<ActaRO>,
    @InjectRepository(ActaCP)
    private readonly actaCPRepository: Repository<ActaCP>,
  ) {}

  async notifyActaROGenerationRO(
    actaId: number,
    userID: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const actaRO = await this.actaRoRepository.findOne({
      where: { id: actaId },
    });

    if (!actaRO) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const user = await this.userRepository.findOne({
      where: { id: userID },
    });

    if (!user) {
      throw new NotFoundException(`El usuario no fue encontrado`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async notifyActaROUpdate(
    actaId: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const acta = await this.actaRoRepository.findOne({
      where: { id: actaId },
    });

    if (!acta) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async notifyActaRODeletion(
    actaId: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const acta = await this.actaRoRepository.findOne({
      where: { id: actaId },
    });

    if (!acta) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async notifyActaCPGenerationRO(
    actaId: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const actaRO = await this.actaCPRepository.findOne({
      where: { id: actaId },
    });

    if (!actaRO) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async notifyActaCPUpdate(
    actaId: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const acta = await this.actaCPRepository.findOne({
      where: { id: actaId },
    });

    if (!acta) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async notifyActaCPDeletion(
    actaId: number,
    createNotificationDto: CreateNotificationDto,
  ) {
    const acta = await this.actaCPRepository.findOne({
      where: { id: actaId },
    });

    if (!acta) {
      throw new NotFoundException(`Acta con ID ${actaId} no encontrada`);
    }

    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async deleteNotification(id: number) {
    return await this.notificationRepository.delete(id);
  }

  async findAll() {
    return await this.notificationRepository.find();
  }
}
