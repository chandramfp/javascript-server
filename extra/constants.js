const  permissions =
{
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: [],
    }

};

const users = [ {

    traineeEmail: 'trainee1@suessive.tech',
    reviewerEmail: 'reviewer1@successive.tech',

    },
    {

        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    
    },
    {

        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
        
    },
    {

        traineeEmail: 'trainecessive.tech',
        reviewerEmail: 'reviewccessive.tech',
        
    },
];

export { permissions , users }
