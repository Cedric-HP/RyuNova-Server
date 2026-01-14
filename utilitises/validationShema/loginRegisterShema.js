import * as yup from 'yup';

export const loginSchema = yup.object({
    email: 
        yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: 
        yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(64, 'Password must be fewer than 64 characters'),
});

export const registerSchema = yup.object({
    name: 
        yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be fewer than 50 characters'),
    email: 
        yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .max(255, 'Email must be fewer than 255 characters'),
    password: 
        yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(64, 'Password must be fewer than 64 characters'),
});