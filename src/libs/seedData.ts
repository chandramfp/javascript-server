import UserRepository from '../repositories/user/UserRepository';


const userRepository = new UserRepository();

export default () => {
    const user = {

        name: 'head-trainee',
        address: 'Noida',
        // dob: new Date('27-12-1993').toDateString(),
        email: 'vinay@nodeexpert.com',
        mobileNumber: 9876543210,
        hobbies: ['Reading']
    };
    userRepository.count().then((count) => {
        console.log('Number of User', count);
        if (!count) {
            return userRepository.create(user)
                .then((res) => {
                    console.log('User seeded Successfully', res);
                });
        }
        console.log('User already exist');
    })
    .catch((err) => console.error(err));
}