import { Test, TestingModule } from '@nestjs/testing';
import { NucleoController } from './nucleo.controller';
import { NucleoService } from './nucleo.service';

describe('NucleoController', () => {
  let controller: NucleoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NucleoController],
      providers: [NucleoService],
    }).compile();

    controller = module.get<NucleoController>(NucleoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
