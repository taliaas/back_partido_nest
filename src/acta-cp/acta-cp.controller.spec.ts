import { Test, TestingModule } from '@nestjs/testing';
import { ActaCpController } from './acta-cp.controller';
import { ActaCpService } from './acta-cp.service';

describe('ActaCpController', () => {
  let controller: ActaCpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActaCpController],
      providers: [ActaCpService],
    }).compile();

    controller = module.get<ActaCpController>(ActaCpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
