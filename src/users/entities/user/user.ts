import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;
}
