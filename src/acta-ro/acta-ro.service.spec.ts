import { Test, TestingModule } from '@nestjs/testing';
import { ActaRoService } from './acta-ro.service';

describe('ActaRoService', () => {
  let service: ActaRoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActaRoService],
    }).compile();

    service = module.get<ActaRoService>(ActaRoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
