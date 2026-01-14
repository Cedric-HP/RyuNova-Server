import * as yup from 'yup';

export const imageSchema = yup.object({
    title: 
        yup.string()
        .max(50, 'Title must be fewer than 50 characters'),
    description: 
        yup.string()
        .max(2000, 'Description must be fewer than 1000 characters'),
    imageCategory: 
        yup.string()
        .required('Image Category is required')
        .oneOf(['image', 'avatar', 'banner'])
});