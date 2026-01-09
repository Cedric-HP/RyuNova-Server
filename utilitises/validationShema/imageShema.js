import * as yup from 'yup';

export const imageSchema = yup.object({
    title: 
        yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be fewer than 50 characters'),
    description: 
        yup.string()
        .max(1000, 'Description must be fewer than 1000 characters'),
    imageCategory: 
        yup.string()
        .required('Image Category is required')
        .oneOf(['image', 'avatar', 'banner'])
});