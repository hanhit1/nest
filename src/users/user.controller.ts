import { Controller, Get, Req, Res, Post, Body, Query, Param ,Put, Delete, NotFoundException} from "@nestjs/common";
import { UsersService } from "./user.service";
import { createUser } from "./dto/create-user.dto"
import { updateUser } from "./dto/update-user.dto";
import { ParseIntPipe } from "src/pipes/ParseIntPipe";
import { User } from "src/common/decorators/user.decorator";
import { log } from "console";
@Controller('user')
export class UsersController{
    constructor(private readonly usersService: UsersService) { }
    @Get()
    getAll() {
        return this.usersService.getAll()
    }
    @Post()
    create(@Body() user: createUser) {
        this.usersService.create(user)
    }
    @Get(':id')
    getById(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.getById(id);
    }
    @Put(':id')
    async updateUser(@Param() id: number, @Body() user: updateUser) {
        const ref: boolean = await this.usersService.update(id, user);
        if (ref == false) throw new NotFoundException('notFound');
    }
    @Delete(':id')
    deleteUser(@Param() id: number, @User('name') curentUser: string) {
        console.log(curentUser);
        this.usersService.delete(id);
    }
}