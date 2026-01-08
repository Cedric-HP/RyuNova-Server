import * as yup from 'yup';

export const imageSchema = yup.object({
    title: 
        yup.string()
        .min(3, 'Password must be at least 8 characters')
        .max(50, 'Password must be fewer than 100 characters'),
    description: 
        yup.string()
        .max(1000, 'Password must be fewer than 100 characters'),
    imageCategory: 
        yup.string()
        .required('Password is required')
        .max(1000, 'Password must be fewer than 100 characters')
        .oneOf(['image', 'avatar', 'banner'])
});