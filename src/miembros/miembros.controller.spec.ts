import { Test, TestingModule } from '@nestjs/testing';
import { MiembrosController } from './miembros.controller';
import { MiembrosService } from './miembros.service';

describe('MiembrosController', () => {
  let controller: MiembrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiembrosController],
      providers: [MiembrosService],
    }).compile();

    controller = module.get<MiembrosController>(MiembrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
