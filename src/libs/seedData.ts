import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';
import * as bcrypt from 'bcrypt';


const userRepository = new UserRepository();

export default () => {
    bcrypt.hash(config.password, 10 , (err, hash) => {
        const user = {
            name: 'head-trainee',
            address: 'Noida',
            // dob: new Date('27-12-1993').toDateString(),
            email: 'chandrashekhar.kumar@successive.tech',
            mobileNumber: 9876543210,
            hobbies: ['Reading'],
            role: 'head-trainer',
            password: hash
        };

        userRepository.count().then((count) => {
            console.log('Number of User', count);
            if (!count) {
                const id = 'Created by Seed';
                return userRepository.create(user, { _id: id})
                    .then((res) => {
                        console.log('User seeded Successfully', res);
                    });
            }
            console.log('User already exist');
        })
        .catch((err) => console.error(err));

    });
};