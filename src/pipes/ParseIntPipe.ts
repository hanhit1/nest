import { PipeTransform, BadRequestException, Injectable } from "@nestjs/common";
@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: any) {
        const transformValue = parseInt(value, 10);
        if (isNaN(transformValue)) {
            throw new BadRequestException('cannot transform input data to number');
        }
        return transformValue;
    }
}