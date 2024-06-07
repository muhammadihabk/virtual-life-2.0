import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { searchUsersSchema, updateUserSchema } from './user.validation';

const ValidateOptions = require('../../../config/validation/validation.config');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');
// const { issueToken } = require('../../auth/lib/issueToken');

// TODO: On Implementing Auth
// module.exports.registerUser = async function registerUser(req, res) {
//   try {
//     const { value: user, error } = registerUserSchema.validate(req.body, ValidateOptions);
//     if (error) {
//       throw error;
//     }
//     await registerUserService(user);

//     const token = issueToken(user);

//     res.status(201).json({ token });
//   } catch (error) {
//     console.log('[User Controller]');
//     errorHandler(res, error);
//   }
// };

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') userId: number, @Res() res: Response) {
    try {
      const user = await this.userService.getUserById(userId);

      user ? res.json(user) : res.sendStatus(404);
    } catch (error) {
      console.log('[User Controller]:', error);
      res.sendStatus(500);
    }
  }

  @Post('/search')
  async searchUsers(@Body() body, @Res() res: Response) {
    try {
      const { value: searchOptions, error } = searchUsersSchema.validate(body, ValidateOptions);
      if (error) {
        throw error;
      }
      const users = await this.userService.searchUsers(searchOptions);

      res.status(200).json(users);
    } catch (error) {
      console.log('[User Controller]');
      errorHandler(res, error);
    }
  }

  @Patch('/:id')
  async updateUser(@Param('id') userId, @Body() body, @Res() res) {
    try {
      const { value: user, error } = updateUserSchema.validate(body, ValidateOptions);
      if (error) {
        throw error;
      }
      const countAffectedRows = await this.userService.updateUser(userId, user);

      countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      console.log('[User Controller]');
      errorHandler(res, error);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId, @Res() res) {
    try {
      const countDeletedRows = await this.userService.deleteUser(userId);

      countDeletedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      console.log('[User Controller]:', error);
      res.sendStatus(500);
    }
  }
}
