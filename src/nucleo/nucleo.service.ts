import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNucleoDto } from './dto/create-nucleo.dto';
import { UpdateNucleoDto } from './dto/update-nucleo.dto';
import { Nucleo } from './entities/nucleo.entity';

@Injectable()
export class NucleoService {
  constructor(
    @InjectRepository(Nucleo)
    private nucleoRepository: Repository<Nucleo>,
  ) {}

  async create(createNucleoDto: CreateNucleoDto) {
    const newNucleo = this.nucleoRepository.create(createNucleoDto);
    return this.nucleoRepository.save(newNucleo);
  }

  async findAll() {
    return this.nucleoRepository.find();
  }

  async findOne(id_nucleo: number) {
    const nucleo = await this.nucleoRepository.findOneBy({ id_nucleo }); // findOneBy con id_nucleo
    if (!nucleo) {
      throw new NotFoundException(`Núcleo con id_nucleo ${id_nucleo} no encontrado.`);
    }
    return nucleo;
  }

  async update(id_nucleo: number, updateNucleoDto: UpdateNucleoDto) {
    const nucleo = await this.findOne(id_nucleo);
    const updatedNucleo = { ...nucleo, ...updateNucleoDto };
    return this.nucleoRepository.save(updatedNucleo);
  }

  async remove(id_nucleo: number) {
    const nucleo = await this.findOne(id_nucleo);
    return this.nucleoRepository.remove(nucleo);
  }

  //(Nuevo) Funcion para cuando se cree un miembro se agrege automaticamnete su nombre al nuclo correspondiente. 
  async addMiembroToNucleo(id_nucleo: number, miembroName: string) {
    const nucleo = await this.nucleoRepository.findOneBy({ id_nucleo }); // Uso de findOneBy con id_nucleo

    if (!nucleo) {
      throw new NotFoundException(`Núcleo con id_nucleo ${id_nucleo} no encontrado.`);
    }

    if (!nucleo.list.includes(miembroName)) {
      nucleo.list.push(miembroName);
      await this.nucleoRepository.save(nucleo);
    }
  }


  //(Nuevo) Función para ver si un miembro pertenece a alguno de los nucelos, si no pertence lanza una excepcion lo cual impide que el usuario se cree. 
  async buscarMiembro(miembroName: string): Promise<void> {
    const nucleos = await this.findAll();
    const miembroEncontrado = nucleos.some(nucleo => nucleo.list.includes(miembroName));

    if (!miembroEncontrado) {
      throw new NotFoundException(`Miembro con nombre ${miembroName} no encontrado en ningún núcleo.`);
    }
  }

  //(Nuevo) Permite obtener una cadena con los identificadores de los nucleos separados por coma ( Esto es para que puedas usarla desde la interfaz cuando quieras obtener los ID pra agregar el miembro)
  //
  async getNucleoIdsAsString(): Promise<string> {
    const nucleos = await this.findAll();
    const ids = nucleos.map(nucleo => nucleo.id_nucleo);
    return ids.join(',');
  }
}
