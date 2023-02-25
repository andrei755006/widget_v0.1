import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let messages = errors.map(err => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }
    return value;
  }

}









// import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
// import { validate } from "class-validator";
// import { ValidationException } from "../exceptions/validation.exeption";
// import { plainToClass } from "class-transformer";
//
//
// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   async transform(value: any, metadata: ArgumentMetadata): Promise<any > {
//     const obj = plainToClass(metadata.metatype, value)
//     const errors = await validate(obj)
//
//     if(errors.length) {
//       console.log(errors)
//       // let messages = errors.map(err => {
//       //   return `${err.property} - `
//       // })
//       throw new ValidationException('');
//     }
//     return value;
//   }
// }
