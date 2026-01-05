const yup = require('yup');

export const userSchema = yup.object({
    name: 
        yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be fewer than 50 characters'),
    email: 
        yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: 
        yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password must be fewer than 100 characters'),
});