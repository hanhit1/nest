import { Controller, Get, Req, Res, Post, Body, Query, Param ,Put, Delete} from "@nestjs/common";
import { UsersService } from "./user.service";
import { createUser } from "./dto/create-user.dto"
import { updateUser } from "./dto/updete-user.dto";
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
    getById(@Param('id') id: number) {
    return this.usersService.getById(id);
    }
    @Put(':id')
    updateUser(@Param() id: number, @Body() user: updateUser) {
        this.usersService.update(id, user); 
    }
    @Delete(':id')
    deleteUser(@Param() id : number) {
        this.usersService.delete(id);
    }
}