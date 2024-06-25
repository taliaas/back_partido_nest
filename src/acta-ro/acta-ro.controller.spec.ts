import { Test, TestingModule } from '@nestjs/testing';
import { ActaRoController } from './acta-ro.controller';
import { ActaRoService } from './acta-ro.service';

describe('ActaRoController', () => {
  let controller: ActaRoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActaRoController],
      providers: [ActaRoService],
    }).compile();

    controller = module.get<ActaRoController>(ActaRoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
