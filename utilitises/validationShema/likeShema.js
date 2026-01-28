import * as yup from 'yup';

export const likeSchema = yup.object({
    id: 
        yup.number()
        .required('Id is required'),
    type: 
        yup.string()
        .required('Type is required')
        .oneOf(['image', 'comment', 'article'])
});