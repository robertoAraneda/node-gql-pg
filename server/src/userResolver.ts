import { Resolver, Query, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { User } from './entity/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return 'hi!';
    }
    @Query(() => [User])
    users(): Promise<User[]> {
        return User.find();
    }
    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('invalid credentials');
        }

        console.log(user);

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error('invalid password');
        }

        return {
            accessToken: sign({ userId: user.id }, 'secret-password', { expiresIn: '15m' }),
        };
    }
    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string
    ): Promise<boolean> {
        try {
            const hashedPassword = await hash(password, 12);
            await User.insert({
                email,
                password: hashedPassword,
                lastName,
                firstName,
            });
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
