import { Test, TestingModule } from '@nestjs/testing';
import { ActaCpService } from './acta-cp.service';

describe('ActaCpService', () => {
  let service: ActaCpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActaCpService],
    }).compile();

    service = module.get<ActaCpService>(ActaCpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
