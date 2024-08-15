import { Test, TestingModule } from '@nestjs/testing';
import { NucleoService } from './nucleo.service';

describe('NucleoService', () => {
  let service: NucleoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NucleoService],
    }).compile();

    service = module.get<NucleoService>(NucleoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
